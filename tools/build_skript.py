#!/usr/bin/env python3
"""Erzeugt www/data/skript.js aus den Original-PDFs (Volltext + Leitfragen je Kapitel).

Aufruf:  python3 tools/build_skript.py <fuchsenskript.pdf> <komment.pdf> <rechtstexte.pdf> <ausgabe.js>
"""
import json, re, subprocess, sys

fs_pdf, km_pdf, rt_pdf, out = sys.argv[1:5]

def pdftext(pdf, *args):
    return subprocess.run(["pdftotext", *args, pdf, "-"], capture_output=True, text=True).stdout

# ---------- Fuchsenskript ----------
fs = pdftext(fs_pdf).split("\n")

def find(title, start=0):
    for i in range(start, len(fs)):
        if fs[i].strip() == title:
            return i
    raise SystemExit("Überschrift nicht gefunden: " + title)

starts = {}
p = find("Branderprüfung", 40)
starts["komment"] = find("Komment", p)
starts["farben"] = find("Farbenkunde", starts["komment"])
starts["lieder"] = find("Liederkunde", starts["farben"])
starts["chargieren"] = find("Chargieren", starts["lieder"])
starts["messe"] = find("Messablauf und Grundgebete", starts["chargieren"])
starts["satzungen"] = find("Satzungen", starts["messe"])
starts["studgesch"] = find("Studentengeschichte", starts["satzungen"])
starts["verbgesch"] = find("Geschichte der Verbindung und des ÖCV", starts["studgesch"])
starts["religion"] = find("Katholische Glaubens- und Sittenlehre", starts["verbgesch"])
starts["geschichte"] = find("Österreichische Staats- und Kulturgeschichte", starts["religion"])
starts["verfassung"] = find("Grundzüge der Bundesverfassung und des politischen", starts["geschichte"])
starts["weltanschauung"] = find("Einstellung zu weltanschaulichen und politischen", starts["verfassung"])
starts["go"] = find("Geschäftsordnung", starts["weltanschauung"])
starts["cartell"] = find("Grundzüge des Cartellrechts", starts["go"])
order = list(starts.keys())
ranges = {}
for i, k in enumerate(order):
    end = starts[order[i + 1]] if i + 1 < len(order) else len(fs)
    ranges[k] = (starts[k] + 1, end)

PAGE = re.compile(r"^Seite \d+ von \d+$|^-?\d+-?$|^\f")

def clean_lines(lines):
    res = []
    for l in lines:
        l = l.replace("\f", "").rstrip()
        if PAGE.match(l.strip()):
            continue
        res.append(l)
    return res

def to_blocks(lines):
    """Zeilen -> Absätze/Überschriften (Heuristik)."""
    blocks, buf = [], []
    def flush():
        if buf:
            t = " ".join(x.strip() for x in buf)
            t = re.sub(r"(\w)- (\w)", lambda m: m.group(1) + "-" + m.group(2) if m.group(2)[0].isupper() else m.group(1) + m.group(2), t)
            t = re.sub(r"\s+", " ", t).strip()
            if t:
                blocks.append({"p": t})
            buf.clear()
    for i, raw in enumerate(lines):
        l = raw.strip()
        if not l:
            flush(); continue
        if l in ("", "", "•", "-", "o"):
            continue
        is_heading = (len(l) < 70 and not re.search(r"[.,;:!?“\")]$", l) and l[0].isupper()
                      and not buf and len(l.split()) <= 9 and not re.match(r"^\d", l))
        if is_heading:
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            if nxt == "" or nxt[:1].isupper() or nxt[:1].isdigit() or nxt[:1] in "„(§":
                flush(); blocks.append({"h": l}); continue
        if re.match(r"^(\d+\.|[-–•]|§ ?\d+)", l) and buf:
            flush()
        buf.append(l)
        if re.search(r"[.!?:“]$", l) and len(l) < 60:
            flush()
    flush()
    # sehr kurze "Überschriften"-Ketten (Tabellenreste) zusammenführen
    merged = []
    for b in blocks:
        if "h" in b and merged and "h" in merged[-1] and len(merged[-1]["h"]) < 30 and len(b["h"]) < 30:
            merged[-1] = {"p": merged[-1]["h"] + " · " + b["h"]}
            continue
        merged.append(b)
    return merged

def split_leitfragen(lines):
    txt = "\n".join(lines)
    m = re.search(r"\nLeitfragen\n", txt)
    if not m:
        return txt.split("\n"), []
    before, after = txt[:m.start()], txt[m.end():]
    flat = re.sub(r"\s+", " ", after).strip()
    parts = re.split(r"(?:^|\s)(\d{1,2})\.\s", " " + flat)
    qs = []
    for j in range(1, len(parts) - 1, 2):
        q = parts[j + 1].strip()
        if q:
            qs.append(q)
    return before.split("\n"), qs

chapters = {}
for k in order:
    a, b = ranges[k]
    lines = clean_lines(fs[a:b])
    body, lf = split_leitfragen(lines)
    note = ""
    if body and body[0].startswith("Prüfungs-Anmerkung"):
        # Prüfungs-Anmerkung bis zur ersten Leerzeile
        j = 0; nb = []
        while j < len(body) and body[j].strip():
            nb.append(body[j].strip()); j += 1
        note = re.sub(r"^Prüfungs-Anmerkung:\s*", "", " ".join(nb))
        body = body[j:]
    chapters[k] = {"note": note, "blocks": to_blocks(body), "leitfragen": lf}

# Zeittafel der Geschichte liegt vor den Leitfragen und ist schon im Text.

# GO: verdrehte Nummerierung der ersten 4 Leitfragen reparieren
go_fix = [
    "Aus welchen wichtigen Teilen (Hauptpunkten) besteht unsere GO?",
    "Welche Arten von Mitgliedern gibt es in der Bajuvaria?",
    "Was ist das „Conventsgeheimnis“? Was ist das „Verbindungsgeheimnis“?",
    "Unter welchen Voraussetzungen und wie häufig kann ein Bajuvare beurlaubt werden? Von welchen Pflichten wird der Betreffende befreit, welche gelten weiterhin?",
]
lf = chapters["go"]["leitfragen"]
lf = [q for q in lf if q and not q.startswith("Aus welchen wichtigen") ]
# erste Einträge sind leer/zusammengeklebt -> ab "Was sind die Voraussetzungen, um als Fuchs" weiter
idx = next((i for i, q in enumerate(lf) if q.startswith("Was sind die Voraussetzungen, um als Fuchs")), None)
if idx is not None:
    chapters["go"]["leitfragen"] = go_fix + lf[idx:]

# ---------- Komment (eigenes Dokument) ----------
km = clean_lines(pdftext(km_pdf).split("\n"))
s = next(i for i, l in enumerate(km) if l.strip() == "Vorwort")
chapters["komment"]["source"] = to_blocks(km[s:])
chapters["komment"]["sourceTitle"] = "Komment der K.a.V. Bajuvaria (Volltext)"

# ---------- Rechtstexte: Satzungen + GO (zweispaltig -> spaltenweise) ----------
npages = int(re.search(r"Pages:\s+(\d+)", subprocess.run(["pdfinfo", rt_pdf], capture_output=True, text=True).stdout).group(1))
cols = []
for pg in range(1, npages + 1):
    if pg <= 3:  # Deckblatt, Inhalt, Satzungen: einspaltig
        cols.append(pdftext(rt_pdf, "-f", str(pg), "-l", str(pg))); continue
    for x in (0, 298):
        t = pdftext(rt_pdf, "-f", str(pg), "-l", str(pg), "-x", str(x), "-y", "0", "-W", "298", "-H", "842")
        cols.append(t)
rt = clean_lines("\n".join(cols).split("\n"))
rt = [l for l in rt if not re.match(r"^K\.a\.V\. Bajuvaria Wien$|^Rechtstexte$|^(Satzungen|Statuten|Geschäftsordnung)$", l.strip())]
txt = "\n".join(rt)
i_sat = txt.find("§ 1. Die Katholisch")
i_stat = txt.find("Statuten der Katholisch")
m_go = re.search(r"Erster Teil\s*\n\s*Rechte und Pflichten", txt[i_stat:])
i_go = i_stat + m_go.start() if m_go else -1
chapters["satzungen"]["source"] = to_blocks(txt[i_sat:i_stat].split("\n")) if i_sat >= 0 else []
chapters["satzungen"]["sourceTitle"] = "Satzungen der K.a.V. Bajuvaria"
chapters["go"]["source"] = to_blocks(txt[i_go:].split("\n")) if i_go >= 0 else []
chapters["go"]["sourceTitle"] = "Geschäftsordnung (4. GO-Novelle)"
chapters["go"]["statuten"] = to_blocks(txt[i_stat:i_go].split("\n")) if i_stat >= 0 else []

with open(out, "w", encoding="utf-8") as f:
    f.write("/* automatisch erzeugt aus den Original-PDFs – nicht von Hand bearbeiten (tools/build_skript.py) */\n")
    f.write("window.SKRIPT = ")
    json.dump(chapters, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")

for k in order:
    c = chapters[k]
    print(f"{k:15s} blocks={len(c['blocks']):4d} leitfragen={len(c['leitfragen']):3d} source={len(c.get('source', [])):4d}")
