/* Lerninhalte Branderprüfung – aufbereitet aus Fuchsenskript (Fassung 1.9.2023), Komment und Rechtstexten der K.a.V. Bajuvaria */
window.CONTENT = window.CONTENT || {};

/* ---------- Verbindungsfarben (Farbenkunde) ---------- */
window.FARBEN = {
  palette: {
    "Weiß": "#f6f4ee", "Rot": "#c4122f", "Gold": "#d6a822", "Schwarz": "#151515", "Blau": "#24408e",
    "Dunkelblau": "#1b2d63", "Hellblau": "#8cc0ea", "Grün": "#1d7a3e", "Violett": "#6b2d8f", "Rosa": "#f1a7c3",
    "Orange": "#ef8a1d", "Silber": "#bfc4c9"
  },
  aeltesten: [
    { n: "Austria Innsbruck", k: "AIn", j: 1864, g: 1, a: 1, f: ["Weiß","Rot","Gold"], m: "weiße Tuchmütze" },
    { n: "Austria Wien", k: "AW", j: 1876, g: 2, a: 5, f: ["Weiß","Gold","Schwarz"], m: "goldbraune Samtmütze" },
    { n: "Norica Wien", k: "Nc", j: 1883, g: 3, a: 2, f: ["Weiß","Blau","Gold"], m: "himmelblaue Tuchmütze" },
    { n: "Carolina Graz", k: "Cl", j: 1888, g: 4, a: 3, f: ["Schwarz","Gold","Weiß"], m: "schwarze Samtmütze" },
    { n: "Rudolfina Wien", k: "Rd", j: 1898, g: 5, a: 6, f: ["Gold","Weiß","Rot"], m: "moosgrüne Samtmütze" },
    { n: "Nordgau Wien", k: "NdW", j: 1900, g: 6, a: 7, f: ["Violett","Weiß","Gold"], m: "gelbe Tuchmütze" },
    { n: "Kürnberg Wien", k: "KbW", j: 1900, g: 7, a: 8, f: ["Gold","Weiß","Grün"], m: "altrosa Tuchmütze" },
    { n: "Leopoldina Innsbruck", k: "L", j: 1901, g: 8, a: 4, f: ["Blau","Grün","Gold"], m: "blaue Samtmütze" },
    { n: "Vindelicia Innsbruck", k: "Vi", j: 1901, g: 9, a: 27, f: ["Rosa","Gold","Blau"], m: "carmesinrote Samtmütze" },
    { n: "Saxo-Bavaria Prag zu Wien", k: "S-B", j: 1907, g: 10, a: 9, f: ["Rot","Grün"], grund: "Weiß", fText: "Rot-Grün auf weißem Grund", m: "dunkelgrüne Tuchmütze" },
    { n: "Traungau Graz", k: "TG", j: 1908, g: 11, a: 10, f: ["Weiß","Orange","Blau"], m: "orange Tuchmütze" }
  ],
  wcv: [
    { n: "Norica", a: 2, f: ["Weiß","Blau","Gold"], m: "himmelblaue Tuchmütze" },
    { n: "Austria", a: 5, f: ["Weiß","Gold","Schwarz"], m: "goldbraune Samtmütze" },
    { n: "Rudolfina", a: 6, f: ["Gold","Weiß","Rot"], m: "moosgrüne Samtmütze" },
    { n: "Nordgau", a: 7, f: ["Violett","Weiß","Gold"], m: "gelbe Tuchmütze" },
    { n: "Kürnberg", a: 8, f: ["Gold","Weiß","Grün"], m: "altrosa Tuchmütze" },
    { n: "Saxo-Bavaria Prag", a: 9, f: ["Rot","Grün"], grund: "Weiß", fText: "Rot-Grün auf weißem Grund", m: "dunkelgrüne Tuchmütze" },
    { n: "Nibelungia", a: 11, f: ["Weiß","Gold","Grün"], m: "weiße halbschlappe Tuchmütze" },
    { n: "Rugia", a: 12, f: ["Gold","Weiß","Blau"], m: "stahlblaue Tuchmütze" },
    { n: "Marco-Danubia", a: 14, f: ["Hellblau","Weiß","Schwarz"], m: "weiße Tuchmütze" },
    { n: "Aargau", a: 15, f: ["Schwarz","Gold","Grün"], m: "kirschrote Seidenmütze" },
    { n: "Franco-Bavaria", a: 16, f: ["Grün","Gold","Blau"], m: "maigrüne Tuchmütze" },
    { n: "Amelungia", a: 17, f: ["Grün","Gold","Rot"], m: "violette Tuchmütze" },
    { n: "Welfia", a: 18, f: ["Rot","Weiß","Gold"], m: "rote Tuchmütze" },
    { n: "Babenberg", a: 19, f: ["Rot","Grün","Gold"], m: "violette Tuchmütze" },
    { n: "Alpenland", a: 21, f: ["Weiß","Gold","Rot"], m: "kornblumenblaue Samtmütze" },
    { n: "Bajuvaria", a: 24, f: ["Dunkelblau","Rot","Gold"], m: "dunkelblaue Tuchmütze", baj: true },
    { n: "Danubia", a: 26, f: ["Blau","Weiß","Gold"], m: "azurblaue Tuchmütze" },
    { n: "Rhaeto-Danubia", a: 29, f: ["Blau","Rot","Silber"], m: "orange Tuchmütze" },
    { n: "Pannonia", a: 30, f: ["Blau","Gold","Rot"], m: "indigoblaue Samtmütze" },
    { n: "Mercuria", a: 31, f: ["Weiß","Rot","Gold"], m: "schwarze Samtmütze" },
    { n: "Sängerschaft Waltharia", a: 34, f: ["Blau","Silber","Grün"], m: "silbergraue Samtmütze" },
    { n: "Austro-Peisonia", a: 35, f: ["Rot","Gold"], grund: "Blau", fText: "Rot-Gold auf blauem Grund", m: "dunkelblaue Samtmütze" }
  ]
};

/* ---------- Texte, die wörtlich sitzen müssen ---------- */
window.TEXTE = {
  lieder: [
    { t: "Gaudeamus igitur (Erstes Allgemeines)", audio: "audio/gaudeamus.mp3", lat: true, s: [
      "Gaudeamus igitur, iuvenes dum sumus; post iucundam iuventutem, post molestam senectutem nos habebit humus!",
      "Ubi sunt, qui ante nos in mundo fuere? Vadite ad superos, transite ad inferos, ubi iam fuere.",
      "Vita nostra brevis est, brevi finietur, venit mors velociter, rapit nos atrociter, nemini parcetur.",
      "Vivat academia, vivant professores, vivat membrum quodlibet, vivant membra quaelibet, semper sint in flore!",
      "Vivant omnes virgines faciles, formosae, vivant et mulieres, tenerae, amabiles, bonae, laboriosae!",
      "Vivat et res publica, gloriosa Austria, vivat nostra civitas, maecenatum caritas, quae nos hic protegit!",
      "Pereat tristitia, pereant osores, pereat diabolus, quivis antiburschius, atque irrisores!"
    ], note: "Bei Bajuvaria wird in Strophe 6 „gloriosa Austria“ statt „et qui illam regit“ gesungen. Wiederholungen (|: :|) sind hier weggelassen." },
    { t: "Wenn wir durch die Straßen ziehen (Letztes Allgemeines)", audio: "audio/strassen.mp3", s: [
      "Wenn wir durch die Straßen ziehen, recht wie Bursch in Saus und Braus, schauen Augen blau-rot-gold’ne, blau-rot-gold aus jedem Haus; und ich lass die Blicke schweifen durch die Fenster hin und her, fast als wollt’ ich eine suchen, die die Allerliebste wär’.",
      "Und doch weiß ich, dass die eine wohnt viel’ Meilen weit von mir, und doch kann ich’s Schau’n nicht lassen nach den schmucken Mädchen hier. Liebchen woll’ dich nicht betrüben, wenn dir eins die Kunde bringt, und dass dich’s nicht überrasche, dieses Lied ein Bajuvare singt.",
      "Liebchen, nicht um Goldeslohne hör’ ich auf, dir treu zu sein, nicht um eine Königskrone; ewig, ewig bleib ich dein! Doch das Schau’n nach schmucken Mädchen, die so freundlich nach mir seh’n, nach den blauen, roten, gold’nen, wirst du mir doch zugesteh’n.",
      "Wenn wir bei den Gläsern sitzen, unser Herz der Wein erfreut, wenn die Lieder hell erklingen, sich manch Freundschaftsband erneut; dann, mein Liebchen, blicke freundlich, hörst du Lied und Becherklang: Dann gedenk’ ich deiner Liebe und dich feiert mein Gesang!"
    ], note: "Reihenfolge: eigene Burschenstrophe, Strophe der anwesenden Vorortsverbindung, ÖCV-, MKV- und KÖL-Verbindungen nach amtlicher Reihenfolge, dann Fuchsenstrophen in umgekehrter Reihenfolge." },
    { t: "Bajuvarias Burschenstrophe", s: [
      "Blau ist uns’rer Klingen Leuchten, rot die Lieb’ zum Heimatland, und das Gold, der Freiheit Zeichen, schmücket unser Burschenband. Bajuvarias blanke Wehre kämpft für hohes Ziel allein, für des Vaterlandes Ehre und der Freiheit Sonnenschein!"
    ] },
    { t: "Bajuvarias Fuchsenstrophe", s: [
      "Füchse, auf zum heil’gen Streite für der Heimat altes Recht! Lasst uns kämpfen Seit’ an Seite, keiner von uns sei ein Knecht! Blau und Rot sind uns’re Farben, zeigen uns’re Treue an und die Liebe zu der Heimat, die uns niemand rauben kann!"
    ] },
    { t: "Bajuvaren in Gefahren", s: [
      "Bajuvaren in Gefahren längst bewährte Freundesschar! Blau-rot-golden lasst erstrahlen dort, wo freche Feinde prahlen! Hütet, hütet Heimat und Altar!",
      "Uns’re Waffen sind geschaffen treu zu wahren uns’re Ehr. Scharf und blank sind uns’re Klingen, die wir gerne zieh’n und schwingen, sei’s zum, sei’s zum Angriff, sei’s zur Wehr!",
      "Unser Streben, unser Leben gilt dem Volk und seinem Wohl. Dies ist unser heißes Mühen: Möge Österreich erblühen, aller, aller Ehren wieder voll!"
    ] },
    { t: "Bajuvaren-Bundeslied", s: [
      "Das Banner hoch, ergreift den blanken Degen! Mit Mut und Kraft in Not und in Gefahr! Wie mut’ge Männer ihres Kampfes pflegen, das zeiget Bajuvarias Burschenschar. Vor keinem Feinde zagen, mit Mut das Höchste wagen. Wie uns’re Väter es so oft getan, das zeigt das blau-rot-gold’ne Banner an!",
      "Blau ist der Stahl, den wir im Kampfe schwingen, hell glänzt sie, uns’re unbefleckte Wehr! Und gibt es auch ein heißes, hartes Ringen, wir halten’s mit dem Spruch: „Viel Feind, viel Ehr’!“. In Stürmen und Gefahren dem Freund die Treue wahren, wie es seit Alters Brauch in unser’m Land, ermahnt das Blau in unser’m Burschenband!",
      "Rot ist die Liebe zum ererbten Lande der Väter, dieser Erde höchstem Gut, und Schmach auf den und allerärgste Schande, der’s nicht verteidigt auch mit seinem Blut. D’rum schwören wir auf’s Neue dem Vaterlande Treue und wollen seinem Blühen und Gedeih’n mit Freuden uns’re ganzen Kräfte weih’n!",
      "Der gold’nen Freiheit sonnenhelles Zeichen schmückt unser Burschenband mit vollem Recht! Wir schwuren, nimmer der Gewalt zu weichen und nie zu dienen als Tyrannenknecht. Für Volk und Glauben leben ist unser höchstes Streben, wir haben ja mit Manneswort und Eid dem Volk, dem Glauben unser Herz geweiht!"
    ] },
    { t: "Auf des Glaubens Felsengrunde (ÖCV-Hymne)", audio: "audio/oecv-hymne.mp3", s: [
      "Auf des Glaubens Felsengrunde stehe du, Cartellverband, wohlgeeint zu jeder Stunde, treu zu Gott und Vaterland! Unser’m Österreich zur Ehre, was auch bringen mag die Zeit, und zum Schutze der Altäre sieh uns, Herr, im Kampf bereit!",
      "Nach der Wissenschaft zu streben sei uns allen ernste Pflicht; nur der Wahrheit lasst uns leben in der Freiheit Himmelslicht! Hohen Zielen aufgeschlossen, gilt’s die Tat, den ganzen Mann, gehet Brüder, unverdrossen, unser’m Volke stets voran.",
      "Für die Freundschaft, die uns bindet, gebt das Letzte freudig hin! Unser Burschenband verkündet dieses Bundes schönsten Sinn: Uns als Brüder zu bewähren, jeder treu zum Bunde hält – dir will immer ich gehören, Heil CV, du meine Welt!"
    ] },
    { t: "EKV-Hymne", lat: true, s: [
      "Vitae nostrae fundamentum fides christiana sit, magna voce praedicamus: hic et nunc Europa fit! Litterisque dedicati unum semper petimus: Deus, frater et Europa finis vitae maximus!"
    ], note: "Grundlage unseres Lebens sei der christliche Glaube … Gott, der Bruder und Europa als größtes Ziel des Lebens!" },
    { t: "Österreichische Bundeshymne", audio: "audio/bundeshymne.mp3", s: [
      "Land der Berge, Land am Strome, Land der Äcker, Land der Dome, Land der Hämmer, zukunftsreich! Heimat bist du großer Söhne, Volk, begnadet für das Schöne, vielgerühmtes Österreich!",
      "Heiß umfehdet, wild umstritten, liegst dem Erdteil du inmitten, einem starken Herzen gleich. Hast seit frühen Ahnentagen hoher Sendung Last getragen, vielgeprüftes Österreich!",
      "Mutig in die neuen Zeiten frei und gläubig sie uns schreiten, arbeitsfroh und hoffnungsreich. Einig lass in Brüderchören, Vaterland, dir Treue schwören, vielgeliebtes Österreich!"
    ], note: "Fassung laut Fuchsenskript." }
  ],
  gebete: [
    { t: "Vater unser", s: ["Vater unser im Himmel, geheiligt werde dein Name. Dein Reich komme. Dein Wille geschehe, wie im Himmel so auf Erden. Unser tägliches Brot gib uns heute. Und vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern. Und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Denn dein ist das Reich und die Kraft und die Herrlichkeit in Ewigkeit. Amen."] },
    { t: "Apostolisches Glaubensbekenntnis", s: ["Ich glaube an Gott, den Vater, den Allmächtigen, den Schöpfer des Himmels und der Erde, und an Jesus Christus, seinen eingeborenen Sohn, unsern Herrn, empfangen durch den Heiligen Geist, geboren von der Jungfrau Maria, gelitten unter Pontius Pilatus, gekreuzigt, gestorben und begraben, hinabgestiegen in das Reich des Todes, am dritten Tage auferstanden von den Toten, aufgefahren in den Himmel; er sitzt zur Rechten Gottes, des allmächtigen Vaters; von dort wird er kommen, zu richten die Lebenden und die Toten. Ich glaube an den Heiligen Geist, die heilige katholische Kirche, Gemeinschaft der Heiligen, Vergebung der Sünden, Auferstehung der Toten und das ewige Leben. Amen."] },
    { t: "Ave Maria", s: ["Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir. Du bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus. Heilige Maria, Mutter Gottes, bitte für uns Sünder jetzt und in der Stunde unseres Todes. Amen."] },
    { t: "Ehre sei dem Vater", s: ["Ehre sei dem Vater und dem Sohn und dem Heiligen Geist. Wie im Anfang, so auch jetzt und allezeit und in Ewigkeit. Amen."] },
    { t: "Schuldbekenntnis", s: ["Ich bekenne Gott, dem Allmächtigen, und allen Brüdern und Schwestern, dass ich Gutes unterlassen und Böses getan habe – ich habe gesündigt in Gedanken, Worten und Werken – durch meine Schuld, durch meine Schuld, durch meine große Schuld. Darum bitte ich die selige Jungfrau Maria, alle Engel und Heiligen, und euch, Brüder und Schwestern, für mich zu beten bei Gott, unserem Herrn."] },
    { t: "Agnus Dei", s: ["Lamm Gottes, du nimmst hinweg die Sünde der Welt, erbarme dich unser. Lamm Gottes, du nimmst hinweg die Sünde der Welt, erbarme dich unser. Lamm Gottes, du nimmst hinweg die Sünde der Welt, gib uns deinen Frieden."] },
    { t: "Einladung zur Kommunion", s: ["P: Seht das Lamm Gottes, das hinwegnimmt die Sünde der Welt. A: Herr, ich bin nicht würdig, dass du eingehst unter mein Dach, aber sprich nur ein Wort, so wird meine Seele gesund."] }
  ]
};

/* ---------- Kapitel ---------- */
window.CONTENT.brander = [
{
  id: "komment", title: "Komment", sub: "Couleur, Zeremonien & Bierkomment", glyph: "§",
  hook: "Warum steht der Senior immer als „ältestes Semester“ da – und was hat „cum mente“ mit Bier zu tun?",
  story: [
    { t: "Was der Komment eigentlich ist", h: `<p>Der <b>Komment</b> ist kurz gesagt <b>das couleurstudentische Brauchtum</b> – „die rechte Art“, wie wir Bajuvaren es halten. Das Wort kommt vom französischen <i>comment</i> („wie“); bei Bajuvaria schreibt man es seit jeher mit K. Mitgedacht wird auch das lateinische <i>cum mente</i> – <b>„mit Geist“</b>.</p>
      <p>Juristisch ist der Komment <b>Gewohnheitsrecht</b>: gelebtes Brauchtum, das wir für Recht halten. Er ändert sich durch lange, von Rechtsüberzeugung getragene Übung – <i>wie</i> das festgestellt oder geändert wird, regelt die <b>GO</b>.</p>
      <div class="fact"><b>„Der Komment lebt.“</b> Er ist kein starres Ritual, sondern entwickelt sich weiter – mit Ausnahme seiner grundsätzlichen Symbole. Tradition ist „Weitergabe des Feuers und nicht Anbetung der Asche“. <br><i>„Lob dem Senior, der unseren Komment neuen Gegebenheiten sinnvoll anpasst, doch Tadel dem, der ihn aus Unkenntnis oder Nachlässigkeit verhunzt!“</i></div>
      <p>Und wann gilt er? <b>Immer.</b> Couleurstudententum ist eine Lebenshaltung – dem Komment unterliegen wir unser ganzes Leben und in jeder Situation. Im ÖCV gibt es – anders als im MKV – <b>keinen verbandseinheitlichen Komment</b>: Unser Komment ist der Schlüssel zur Seele unserer Verbindung.</p>
      <div class="tip">Geschichte in einem Satz: „Comment“ seit 1770, „Purschenraisonn“ seit 1750, ältester erhaltener schriftlicher Komment 1791; Vorläufer ist das <i>IUS POTANDI</i> des Blasius Multibibus (1616). Der Bajuvaren-Komment wurde 1935 erstmals niedergeschrieben (Autor beider ersten Auflagen: Gründungssenior Dr. cer. Isegrim).</div>` },
    { t: "Band, Deckel, Zirkel – unsere Farben", h: `<p>Die Bajuvaren-Farben sind <b>Dunkelblau – Rot – Gold</b>. Weil Allemannia, Saxonia und Rabenstein 1922 Einspruch wegen Verwechslungsgefahr erhoben, kamen <b>Trennungsstreifen</b> hinzu: Im Band heißen sie <b>Durchbruch (Durchstoß)</b>, die schmalen Randstreifen <b>Vorstoß</b>. Von unten betrachtet erscheint im Bandinneren so Schwarz-Rot-Gold – ein bewusstes Bekenntnis gegen das deutschnationale Schwarz-Weiß-Rot.</p>
      <div class="band-demo" data-band="baj"></div>
      <ul><li><b>Burschenband:</b> 32 mm (für Bierzipfe auch ca. 27/28 mm). Bajuvaria verwendet nur das <b>Bierband</b>.</li>
      <li><b>Fuchsenband:</b> Blau-Rot mit Durch- und Vorstößen, <b>28 mm</b> – so stecken alle drei Farben auch im Fuchsenband.</li>
      <li>Andere kennen Weinband (≈13 mm, halbe Breite), Sektband (≈8/9 mm, ein Drittel) und Schnapsband.</li>
      <li>Das Band wird <b>über die rechte Schulter nach links</b> getragen, unter dem Sakko. Der <b>Senior</b> trägt das schlichte Burschenband, der <b>Fuchsmajor</b> zusätzlich das Fuchsenband kreuzweise darüber.</li>
      <li>Besondere Bänder: <b>Jubelband</b> (50/100/125/150 Semester) und <b>Band pro meritis</b>.</li></ul>
      <p><b>Deckel:</b> dunkelblaue Grundfarbe, unten <b>Perkussion</b> in Rot und Gold mit Trennungsstreifen Schwarz und Gold, oben goldener <b>Durchbruch (Biese)</b>; der Abstand dazwischen heißt <b>Teilhöhe</b>. Form: halbsteife kleine Korpsform, getragen im <b>Tellerformat</b>.</p>
      <p>Weitere Kopfbedeckungen: <b>Cerevis</b> (Teil des Wichs, auch zum Frack), <b>Biertonne</b> (dunkelblau, dreifarbiger Rand, goldener Zirkel – von Alten Herren statt des Deckels; der Dr. cer. trägt sie goldbestickt) und der weiße <b>Stürmer</b> mit goldenem Zirkel (Burschen, Sommersemester/-ferien).</p>
      <div class="fact"><b>Zirkel</b> = Anfangsbuchstaben von <b>V</b>ivat, <b>C</b>rescat, <b>F</b>loreat + Wahlspruch der Urburschenschaft <b>E</b>hre, <b>F</b>reiheit, <b>V</b>aterland + Anfangsbuchstabe des Verbindungsnamens (<b>B</b>). In unserem Zirkel stecken also <b>B, C, E, F</b> (V) – und bei der Prüfung musst du ihn <b>zeichnen</b>!</div>
      <p><b>Wahlspruch:</b> „<b>Für Volk und Glauben!</b>“</p>
      <p><b>Wappen</b> (Prunkfahne): heraldisch rechts oben zwei <b>Ringe</b> (Lebensfreundschaft), heraldisch links oben <b>Eule und Buch</b> (Wissenschaft), unten <b>Lyra und Schwert</b> (Kunst, Lebensfreude, Wehrhaftigkeit – „kämpfen und singen können“), darüber das <b>Kreuz</b> über allen Feldern, im <b>Herzschild</b> das weiße Kreuz auf Rot (Wien bzw. altes Reichsfeldzeichen).</p>` },
    { t: "Zipfe, Farbennadel, Couleurfähigkeit", h: `<p><b>Zipfe</b> bestehen aus zwei Stücken Band mit Metallschiebern und Halterung und hängen am Zipfhalter am <b>rechten Hosenbund</b>. Sie werden als Zeichen besonderer Wertschätzung unter Burschen <b>getauscht</b> (geschenkt) oder einer Dame geschenkt. Bajuvaren tauschen in der Regel <b>Bierzipfe</b>; Ausnahme Leibbursch: Der Leibbursch erhält vom Leibfuchsen einen <b>Weinzipf</b>, der Leibfuchs vom Leibburschen einen <b>Bierzipf</b>. Sekt- und Schnapszipfe gehen an Damen. Ein getauschter Fuchsenzipf darf erst nach der Burschung getragen werden.</p>
      <p>Die <b>Farbennadel</b> (Bierfloh, Bierlaus, Biernadel) kann man auch im Alltag am Revers tragen.</p>
      <p><b>Couleur</b> = Farbe. In vollen Farben (<i>plenis coloribus</i>, p.c.) = Band + Deckel; ohne Farben (<i>sine coloribus</i>, s.c.) ist man „im Spieß“. Couleur anlegen = <b>auftakeln/aufziehen</b>, ablegen = <b>abtakeln</b>. Mindestvoraussetzung ist <b>couleurfähige Kleidung</b>: grundsätzlich Sakko und Hemd mit Halsabschluss – Sport- und Freizeitkleidung nie.</p>
      <div class="tip">Wer ein Farbenverbot hat („Farbschisser“), darf sein Couleur auch auf p.c.-Veranstaltungen nicht tragen – höchstens vor sich auf den Tisch legen.</div>` },
    { t: "Wichs, Fahnen & Chargieren", h: `<p>Der <b>Wichs</b> ist die studentische Festtracht (Begriff seit 1778), abgeleitet von der Kavallerieuniform. Zum <b>Vollwichs</b> gehören: <b>Kanonen</b> (hohe schwarze Stiefel bzw. Stulpen), <b>Buchsen</b> (weiße Hosen), <b>Flaus</b> (dunkelblau, rot-goldene Verschnürung, Knöpfe = „Oliven“), <b>Schärpe</b>, <b>Stulpenhandschuhe</b>, <b>Cerevis</b> und <b>Schläger</b>.</p>
      <p><b>Chargieren</b> heißt, die Verbindung in Wichs offiziell zu vertreten; die Handelnden sind die <b>Chargierten</b>. Grundregeln: Kommandos werden <b>nicht geschrien</b>, jeder Einsatz wird vorher besprochen und geprobt, Haltung und Disziplin gehen vor.</p>` },
    { t: "Gesellschaft & Anrede", h: `<p>Der <b>Gesellschaftskomment</b> regelt den Umgang der Verbindung und ihrer Mitglieder nach außen – auch wenn du gerade <i>kein</i> Couleur trägst: Man soll uns immer als Couleurstudenten erkennen. In der Öffentlichkeit gilt: Würde des Couleurs wahren, keine Provokationen, umsichtig in Verkehrsmitteln und bei fremden Veranstaltungen.</p>
      <p>Unter ÖCVern gilt das <b>brüderliche „Du“</b> (Art. VI ÖCV-Satzung). Bundesbrüder (Bbr.) sind Mitglieder der eigenen Verbindung, Cartellbrüder (Cbr.) jene aus dem ÖCV; über Verbändeabkommen werden auch Mitglieder befreundeter Verbände (MKV, KÖL, CV, SchwStV …) zu C(K)artellbrüdern. Details zu Vorstellung und Anrede findest du im Volltext des Komments.</p>` },
    { t: "Zeremonien: Reception, Branderung, Burschung, Trauer", h: `<ul><li><b>Reception</b>: feierliche Aufnahme als Fuchs.</li>
      <li><b>Branderung</b>: findet im <b>Inoffizium</b> statt – letzter Rest der mittelalterlichen „Deposition“.</li>
      <li><b>Burschung</b>: feierliche Aufnahme in den Kreis der vollberechtigten Bundesbrüder, <b>immer auf einem Kommers</b>; vollzieht den historischen <b>Ritterschlag</b> nach (seit 1843).</li>
      <li><b>Trauerkneipe</b>: in der Regel einmal jährlich für alle im letzten Jahr verstorbenen Bajuvaren, bei <b>Kerzenlicht</b>, mit dem vollen Glas des Toten; es herrscht <b>SILENTIUM TRISTE</b>.</li>
      <li><b>Landesvater</b> (wird auf eigener Festkneipe „gestochen“, Stich wird mit goldenem Eichenlaub vernäht) und <b>Promotion zum DOCTOR CEREVISIAE</b> – bei der Prüfung nur kurz umreißen.</li></ul>
      <div class="tip">Promotions- und Hochzeitskomment, Biergericht, Kreuzkomment und „Halber um die Welt“ sind laut Skript nur als Zusatz in wenigen Worten nötig.</div>` },
    { t: "Bierkomment: Kneipe, Bierzeit, Silentium", h: `<p>Der <b>Bierkomment</b> ist die Gesamtheit der Bräuche, die auf Kneipen <b>Ordnung</b> halten und die <b>Gemütlichkeit</b> heben. Er gilt, wo sich <b>drei bierehrliche Seelen, darunter mindestens ein Bursch</b>, bei kommentmäßigem Stoff zur fröhlichen Geselligkeit treffen: <b>TRES FACIUNT COLLEGIUM</b>. Auf Conventen gilt er nicht (keine Absicht zur Geselligkeit).</p>
      <div class="fact"><b>Bierzeit:</b> 1 Bierstunde = 100 Bierminuten, 1 Bierminute = 36 Sekunden, kleinste Einheit 5 Bierminuten (= 3 Minuten). Die Bierzeit läuft <b>rückwärts</b> und wird durch das <b>TEMPUS UTILE</b> unterbrochen (z. B. jedes Tempus, allgemeine Lieder, Kneipzeremonien, unverschuldeter Stoffmangel, Festrede).</div>
      <p><b>§ 11: „Es wird fortgetrunken“ (PORRO BIBITUR)</b> – nach der Kneipe geht man nicht getrennt in verschiedene Lokale, sondern bleibt beisammen. Und: Fragt das Präsidium oder der FM im Fuchsenstall nach einer Seitenzahl (oder deren Ziffernsumme), ruft man im Chor „<b>Elf!</b>“.</p>
      <p><b>SILENTIUM</b>: Unbefugtes Reden, Singen, Trinken, Rauchen ist verboten; Chargierte stehen. Nur das Präsidium darf jederzeit Silentium gebieten. Das Gegenteil ist <b>COLLOQUIUM</b> (Gespräch). Wortmeldung: „<b>Peto verbum!</b>“; ein <b>TEMPUS</b> (z. B. „Peto tempus navigandi causa!“) holt man sich beim zuständigen Contrarium.</p>
      <p><b>Kneiptafel</b>: gegliedert in Tischachsen (<b>Zapfen</b>), meist <b>E- oder U-Form</b>; das Präsidium sitzt in der Mitte, an den Enden Contrarien bzw. FM. Alle Kneipanten bilden die <b>Korona</b>; man unterscheidet <b>vollberechtigte</b> (alle mit Burschenrechten: Burschen, Philister, Ehrenmitglieder) und <b>minderberechtigte</b> (z. B. Füchse) Kneipanten. <b>Bierehrlich</b> ist, wer den Komment anerkennt, kommentgemäßen Stoff hat und seine Bierrechte nicht verloren hat.</p>` },
    { t: "Kneipablauf, Stoff & Salamander", h: `<p>Eine Kneipe hat <b>Offizium</b> (feierlich: Einzug der Chargierten, Erstes Allgemeines, Begrüßung, Letztes Allgemeines) und <b>Inoffizium</b> (gelöster: spezielle Komments, Bierschwefel und Bierulk, Bierzeitung), dazu die Fidulitas. Kneiparten: gewöhnliche Kneipen (mind. einmal im Monat; nur hier Reception oder Branderung), Festkneipen, Trauerkneipen, Kommerse. Ein <b>Sumpf</b> ist das formlose Weiterfeiern.</p>
      <p><b>Stoff</b> = kommentgemäßes Getränk (der Begriff steht schon 1616 im Ius potandi). Ein <b>breiter Streifen</b> ist mindestens <b>zwei Finger</b> breit, die <b>Diagonale</b> etwa das halbe Glas. <b>Biersetzen (Ponieren)</b>: jemand bezahlt Stoff für die Korona – als <b>Fiskus</b> (aus Strafgeldern) oder <b>Lisl</b> (aus einer Spende).</p>
      <p><b>Bierjunge</b> = Parodie auf die Mensur (Paukanten, Sekundanten, Unparteiischer).</p>
      <div class="fact"><b>Festsalamander</b> – Präsidium: „Silentium! Zu Ehren … präpariert sich ein donnernder Salamander! Sind die Stoffe präpariert?“ – Korona: „<b>Sunt!</b>“ – „Ad exercitium salamandri in honorem … omnes surgite! Salamander incipit!“ – „1! 2! 3! Bibite!“ – dann die Strophe „Auf und ergreifet froh das Schwert … Österreichs Freiheit ist es wert …“, Reiben gegen den Uhrzeigersinn („Salamander, Salamander …“) und „1! 2! 3!“.</div>
      <p><b>Strafen</b>: Geldstrafen (nur Präsidium/Biergericht, auch als Bierstriche) und Bierstrafen – <b>Genussstrafen</b> (<b>PRO POENA</b>-Trinken, Stärkenlassen) oder der <b>Bierverschiss (B-V)</b>, eine Verkürzung der Kneiprechte bei besonders schweren Vergehen. Wer sich selbst ertappt, kann sich <b>löffeln</b> – wird dadurch aber nicht straffrei.</p>` }
  ],
  quiz: [
    { q: "Woher kommt das Wort „Komment“?", a: ["Französisch „comment“ (wie)", "Lateinisch „commentarius“", "Italienisch „commento“", "Griechisch „kosmos“"], c: 0, e: "Comment = wie; mitgedacht wird auch lateinisch „cum mente“ – mit Geist." },
    { q: "Rechtlich gesehen ist der Komment …", a: ["Gewohnheitsrecht", "Vereinsgesetz", "Teil der Statuten", "Kirchenrecht"], c: 0, e: "Gelebtes Brauchtum, das man für Recht hält = Gewohnheitsrecht. Wie es festgestellt/geändert wird, regelt die GO." },
    { q: "Wie breit ist das Burschenband Bajuvariae?", a: ["32 mm", "28 mm", "27 mm", "13 mm"], c: 0, e: "32 mm; das Fuchsenband hat 28 mm (= Burschenband-Breite anderer CV-Verbindungen)." },
    { q: "Wie heißen die schmalen Farbstreifen am Rand des Bandes?", a: ["Vorstoß", "Durchbruch", "Perkussion", "Teilhöhe"], c: 0, e: "Rand = Vorstoß; Trennungsstreifen im Inneren = Durchbruch (Durchstoß)." },
    { q: "Welche Buchstaben stecken im Zirkel Bajuvariae?", a: ["V, C, F, E, F, V + B", "V, C, F + B allein", "F, V, G + B", "B, V, G, P"], c: 0, e: "Vivat-Crescat-Floreat + Ehre-Freiheit-Vaterland + Bajuvaria: B, C, E, F (V)." },
    { q: "Wie lautet der Wahlspruch Bajuvariae?", a: ["Für Volk und Glauben!", "In necessariis unitas …", "Gott, Ehre, Freiheit, Vaterland", "Viel Feind, viel Ehr’"], c: 0, e: "„Für Volk und Glauben!“ (§ 7 Satzungen)." },
    { q: "Was symbolisieren Eule und Buch im Wappen?", a: ["Wissenschaft", "Lebensfreundschaft", "Religion", "Vaterland"], c: 0, e: "Ringe = Lebensfreundschaft, Eule & Buch = Wissenschaft, Lyra & Schwert = Kunst/Lebensfreude/Wehrhaftigkeit, Kreuz = Glaube." },
    { q: "Wann gilt der Bierkomment?", a: ["Wo drei bierehrliche Seelen, darunter mind. ein Bursch, bei Stoff gesellig zusammen sind", "Nur auf offiziellen Kneipen", "Auf jedem Convent", "Sobald Couleur getragen wird"], c: 0, e: "TRES FACIUNT COLLEGIUM – nicht aber auf Conventen." },
    { q: "Wie lange dauert eine Bierminute?", a: ["36 Sekunden", "60 Sekunden", "100 Sekunden", "5 Minuten"], c: 0, e: "100 Bierminuten = 1 Bierstunde = 60 Minuten; die Bierzeit läuft rückwärts." },
    { q: "Was besagt § 11?", a: ["Es wird fortgetrunken (Porro bibitur)", "Das Präsidium hat immer recht", "Füchse trinken zuerst", "Silentium triste"], c: 0, e: "Man bleibt nach der Kneipe in bundesbrüderlicher Geselligkeit beisammen." },
    { q: "Wer darf jederzeit SILENTIUM gebieten?", a: ["Nur das Präsidium", "Jeder Bursch", "Der Fuchsmajor", "Jedes Contrarium"], c: 0, e: "Nur das Präsidium; Chargierte stehen während des Silentiums." },
    { q: "Wie breit ist ein „breiter Streifen“ mindestens?", a: ["Zwei Finger", "Ein Finger", "Das halbe Glas", "Ein Daumen"], c: 0, e: "Die Diagonale ist etwa das halbe Glas." },
    { q: "Was ist ein Fiskus?", a: ["Aus Strafgeldern gesetzter Stoff für die Korona", "Von einem Spender bezahlter Stoff", "Die Fuchsenkassa", "Eine Kneipstrafe"], c: 0, e: "Die Lisl wird dagegen aus einer Stoffspende finanziert." },
    { q: "Wo findet die Branderung statt?", a: ["Im Inoffizium", "Im Offizium", "Auf einem Kommers", "Am Burschenconvent"], c: 0, e: "Die Burschung dagegen immer auf einem Kommers." },
    { q: "Was ruft die Korona auf „Sind die Stoffe präpariert?“", a: ["Sunt!", "Fiducit!", "Prosit!", "Vivat!"], c: 0, e: "Danach folgt „Ad exercitium salamandri …“." },
    { q: "Welche Strafe ist eine „Genussstrafe“?", a: ["Pro-poena-Trinken", "Bierverschiss", "Ausschluss", "Farbenverbot"], c: 0, e: "Genussstrafen: Pro-poena-Trinken und Stärkenlassen; daneben gibt es den B-V." },
    { q: "Welche Kopfbedeckung tragen Burschen im Sommersemester statt des Deckels?", a: ["Weißen Stürmer mit goldenem Zirkel", "Biertonne", "Cerevis", "Barett"], c: 0, e: "Die Biertonne können Alte Herren statt des Deckels tragen." },
    { q: "Wie wird das Band getragen?", a: ["Über die rechte Schulter nach links", "Über die linke Schulter nach rechts", "Um den Hals", "Waagrecht über die Brust"], c: 0, e: "Unter dem Sakko; nur bei bestimmten Zeremonien darüber." },
    { q: "Welchen Zipf erhält der Leibbursch vom Leibfuchsen?", a: ["Weinzipf", "Bierzipf", "Sektzipf", "Schnapszipf"], c: 0, e: "Der Leibfuchs bekommt vom Leibburschen einen Bierzipf." }
  ],
  cards: [
    ["Komment – Definition", "Das couleurstudentische Brauchtum; „die rechte Art“; unser couleurstudentisches Gewohnheitsrecht."],
    ["„Der Komment lebt“", "Er entwickelt sich durch Übung weiter (außer seinen Grundsymbolen) – kein starres Ritual; Feststellung/Änderung nach der GO."],
    ["Farben Bajuvariae", "Dunkelblau – Rot – Gold, mit Durchbrüchen (Gold, Schwarz) und Vorstößen (oben Gold, unten Rot)."],
    ["Bandbreiten", "Burschenband 32 mm · Fuchsenband 28 mm · Weinband ≈13 mm · Sektband ≈8/9 mm"],
    ["Deckel Bajuvariae", "Dunkelblau, Perkussion Rot-Gold mit Trennstreifen Schwarz/Gold, goldener Durchbruch (Biese), halbsteife kleine Korpsform, Tellerformat."],
    ["Zirkel", "Vivat Crescat Floreat + Ehre Freiheit Vaterland + B(ajuvaria)"],
    ["Wahlspruch", "„Für Volk und Glauben!“"],
    ["Vollwichs", "Kanonen, Buchsen, Flaus, Schärpe, Stulpenhandschuhe, Cerevis, Schläger"],
    ["Plenis / sine coloribus", "p.c. = Band + Deckel · s.c. = ohne Farben („im Spieß“)"],
    ["Tres faciunt collegium", "Drei bierehrliche Seelen (mind. ein Bursch) bei Stoff → Bierkomment gilt."],
    ["Bierzeit", "100 Bierminuten = 1 Stunde; 1 Bierminute = 36 s; läuft rückwärts; Unterbrechung durch Tempus utile."],
    ["§ 11", "Es wird fortgetrunken (Porro bibitur)."],
    ["Bierehrlichkeit", "Komment anerkannt + kommentgemäßer Stoff + Bierrechte nicht verloren."],
    ["Offizium / Inoffizium", "Feierlicher Teil (Einzug, Allgemeine Lieder, Begrüßung) / gelöster Teil (spezielle Komments, Bierulk, Bierschwefel)."],
    ["Fiskus vs. Lisl", "Fiskus = aus Strafgeld gesetzter Stoff · Lisl = aus Spende"],
    ["Bierverschiss (B-V)", "Strafweise Verkürzung der Kneiprechte bei besonders schweren Vergehen; endet durch Herauspauken oder Kneipende."],
    ["Bierjunge", "Parodie auf die Mensur – Paukanten, Sekundanten, Unparteiischer."],
    ["Drei spezielle Komments (Beispiele)", "Krambambuli-Komment, Lebe-Liebe-Komment, Stafette (weitere: Rundgesang, Gänsemarsch, Hammerschmied …)"]
  ],
  cloze: [
    "Der Komment ist unser couleurstudentisches {{Gewohnheitsrecht}}.",
    "Das Burschenband Bajuvariae ist {{32}} mm breit, das Fuchsenband {{28}} mm.",
    "Die Trennungsstreifen im Band heißen {{Durchbruch}}, die Randstreifen {{Vorstoß}}.",
    "Der Bierkomment gilt nach dem Grundsatz „Tres faciunt {{collegium}}“.",
    "Eine Bierminute dauert {{36}} Sekunden, die Bierzeit läuft {{rückwärts}}.",
    "§ 11 lautet: Es wird {{fortgetrunken}}.",
    "Die Burschung erfolgt immer auf einem {{Kommers}}, die Branderung im {{Inoffizium}}."
  ],
  order: [
    { t: "Ablauf Festsalamander", items: ["Ankündigung: „präpariere sich ein donnernder Festsalamander binnen fünf Bierminuten“", "„Sind die Stoffe präpariert?“ – „Sunt!“", "„Ad exercitium salamandri … omnes surgite! Salamander incipit!“", "„1! 2! 3! Bibite!“ – Trinken", "„Auf und ergreifet froh das Schwert …“", "Reiben gegen den Uhrzeigersinn: „Salamander, Salamander …“", "„1! 2! 3!“ – Gläser donnernd absetzen"] }
  ]
},
{
  id: "farben", title: "Farbenkunde", sub: "Die 11 ältesten & alle WCV-Verbindungen", glyph: "▤",
  hook: "Austria, Norica, Rudolfina … – erkennst du Cartellbrüder schon von Weitem an Band und Deckel?",
  story: [
    { t: "Worum es geht", h: `<p>Mitglieder anderer ÖCV-Verbindungen an ihren Farben zu erkennen, gehört zum guten Ton. Für die Prüfung musst du kennen:</p>
      <ul><li><b>alle Verbindungen am Wiener Hochschulstandort (WCV)</b>,</li><li>die <b>10 bzw. 11 ältesten Verbindungen</b> – nach <b>Gründungsjahr</b> <i>und</i> nach <b>amtlicher Reihenfolge</b> (Eintritt in den (Ö)CV).</li></ul>
      <p>Abgefragt wird in <b>beide Richtungen</b>: Name → Farben/Deckel und Farben → Name. Weil manche Farbkombinationen mehrfach vorkommen, ist der <b>Deckel</b> oft das entscheidende Unterscheidungsmerkmal.</p>
      <div class="tip">Merk-Trick: Die frühen CV-Verbindungen tragen gern <b>Weiß-Gold</b> (Kirche), <b>Rot-Weiß-Rot</b> (Österreich/Habsburg) und <b>Schwarz-Gold</b> (Heiliges Römisches Reich/Habsburgermonarchie) – ein bewusstes Bekenntnis gegen die deutschnationalen Korporationen um 1900.</div>
      <div class="tip">Achte auf Verwechslungsgefahren: Welfia (Rot-Weiß-Gold) vs. Mercuria (Weiß-Rot-Gold) · Alpenland (Weiß-Gold-Rot) vs. Rudolfina (Gold-Weiß-Rot) · Pannonia (Blau-Gold-Rot) vs. Bajuvaria (Blau-Rot-Gold) · Amelungia und Babenberg tragen beide violette Tuchmützen.</div>` },
    { t: "Die 11 ältesten im Überblick", h: `<div data-farbtabelle="aeltesten"></div>` },
    { t: "Alle Verbindungen im WCV", h: `<div data-farbtabelle="wcv"></div>` }
  ],
  special: "farben",
  cards: [], quiz: [], cloze: [],
  order: [
    { t: "Nach Gründungsjahr ordnen (älteste zuerst)", items: ["Austria Innsbruck (1864)", "Austria Wien (1876)", "Norica Wien (1883)", "Carolina Graz (1888)", "Rudolfina Wien (1898)", "Nordgau Wien (1900)", "Kürnberg Wien (1900)", "Leopoldina Innsbruck (1901)", "Vindelicia Innsbruck (1901)", "Saxo-Bavaria Prag (1907)", "Traungau Graz (1908)"] },
    { t: "Nach amtlicher Reihenfolge ordnen (1–10)", items: ["Austria Innsbruck", "Norica", "Carolina", "Leopoldina", "Austria Wien", "Rudolfina", "Nordgau", "Kürnberg", "Saxo-Bavaria", "Traungau"] }
  ]
},
{
  id: "lieder", title: "Liederkunde", sub: "Alle Texte fehlerfrei", glyph: "♪",
  hook: "Gaudeamus war ursprünglich ein Bußlied – heute eröffnet es jede Kneipe. Kannst du alle Strophen?",
  story: [
    { t: "Was verlangt wird", h: `<p>Zu einer positiven Prüfung gehört das <b>flüssige und fehlerfreie Aufsagen aller Liedtexte</b>. Bei den häufig gesungenen Liedern wird auch die Melodie vorausgesetzt; für ein besseres Kalkül die <b>Melodien aller Lieder</b>.</p>
      <ul><li><b>Erstes Allgemeines:</b> Gaudeamus igitur (7 Strophen, bei Bajuvaria „gloriosa Austria“ in Str. 6)</li>
      <li><b>Letztes Allgemeines:</b> Wenn wir durch die Straßen ziehen – mit Burschen- und Fuchsenstrophe</li>
      <li>Bajuvaren in Gefahren · Bajuvaren-Bundeslied · ÖCV-Hymne „Auf des Glaubens Felsengrunde“ · EKV-Hymne · Bundeshymne</li></ul>
      <div class="fact">Das <b>Gaudeamus</b> entstand aus einem mittelalterlichen <b>Bußlied</b> und erhielt seine heutige Form im 18. Jahrhundert. Inhalt: Freut euch, solange ihr jung seid – das Leben ist kurz; es lebe die Universität, die Professoren, der Staat – nieder mit Traurigkeit und Spöttern.</div>
      <p>Beim Letzten Allgemeinen gilt die Reihenfolge: <b>eigene Burschenstrophe → anwesende Vorortsverbindung → ÖCV-, MKV- und KÖL-Verbindungen nach amtlicher Reihenfolge → Fuchsenstrophen in umgekehrter Reihenfolge</b>. Abkürzung: Verbandshymne der Gäste oder für alle die EKV-Hymne.</p>
      <div class="tip">Lern-Hack: Nutze unten den <b>Text-Trainer</b> – erst lesen, dann Lücken füllen, dann Strophe für Strophe frei aufsagen und selbst bewerten. Melodien findest du auf YouTube.</div>` },
    { t: "Hörproben", h: `<p>Hör mit, sing mit: Für diese Lieder gibt es Hörproben. Im Text-Trainer läuft die Musik weiter, während du zwischen Lesen, Lücken und Aufsagen wechselst.</p><div data-hoerproben></div>` },
    { t: "Was die Farben im Lied bedeuten", h: `<p>Burschenstrophe und Bundeslied erklären unsere Farben: <b>Blau</b> = der Klingen Leuchten / Treue zum Freund, <b>Rot</b> = Liebe zum Heimatland, <b>Gold</b> = Zeichen der Freiheit. Das Bundeslied endet mit dem Wahlspruch: „<b>Für Volk und Glauben</b> leben ist unser höchstes Streben“.</p>` }
  ],
  special: "texte:lieder",
  quiz: [
    { q: "Welches Lied ist das Erste Allgemeine?", a: ["Gaudeamus igitur", "Wenn wir durch die Straßen ziehen", "Auf des Glaubens Felsengrunde", "Bajuvaren in Gefahren"], c: 0, e: "Das Letzte Allgemeine ist „Wenn wir durch die Straßen ziehen“." },
    { q: "Was singt Bajuvaria in Str. 6 des Gaudeamus statt „et qui illam regit“?", a: ["gloriosa Austria", "vivat Bajuvaria", "semper in flore", "nostra civitas"], c: 0, e: "„Vivat et res publica, gloriosa Austria …“" },
    { q: "Woraus entstand das Gaudeamus?", a: ["Aus einem mittelalterlichen Bußlied", "Aus einem Trinklied der Corps", "Aus der Akademischen Festouvertüre", "Aus einem Soldatenlied 1813"], c: 0, e: "Heutige Form im 18. Jahrhundert." },
    { q: "Wofür steht laut Burschenstrophe das Rot?", a: ["Liebe zum Heimatland", "Blut der Gefallenen", "Freiheit", "Treue"], c: 0, e: "„… rot die Lieb’ zum Heimatland, und das Gold, der Freiheit Zeichen …“" },
    { q: "In welcher Reihenfolge kommen die Fuchsenstrophen im Letzten Allgemeinen?", a: ["In umgekehrter Reihenfolge, nach allen Burschenstrophen", "Direkt nach der eigenen Burschenstrophe", "Gar nicht", "Vor den Burschenstrophen"], c: 0, e: "Burschenstrophen (eigene, Vorort, amtliche Reihenfolge) → Fuchsenstrophen umgekehrt." },
    { q: "Wie beginnt die ÖCV-Hymne?", a: ["Auf des Glaubens Felsengrunde", "Vitae nostrae fundamentum", "Das Banner hoch", "Land der Berge"], c: 0, e: "„… stehe du, Cartellverband, wohlgeeint zu jeder Stunde …“" },
    { q: "Was ist laut EKV-Hymne „finis vitae maximus“?", a: ["Deus, frater et Europa", "Fides christiana", "Patria et libertas", "Scientia"], c: 0, e: "Gott, der Bruder und Europa als größtes Ziel des Lebens." },
    { q: "„Wir halten’s mit dem Spruch …“ – welcher Spruch im Bundeslied?", a: ["Viel Feind, viel Ehr’!", "Für Volk und Glauben!", "Vivat, crescat, floreat!", "Ehre, Freiheit, Vaterland!"], c: 0, e: "2. Strophe des Bajuvaren-Bundeslieds." }
  ],
  cards: [
    ["Gaudeamus Str. 1 – Übersetzung", "Freuen wir uns also, solange wir jung sind; nach der Jugend, nach dem Alter wird uns die Erde haben."],
    ["Gaudeamus Str. 3 – Übersetzung", "Kurz ist unser Leben … der Tod kommt schnell, raubt uns grausam, niemand wird verschont."],
    ["Gaudeamus Str. 4 – Übersetzung", "Es lebe die Hohe Schule, es leben die Professoren … immer sollen sie in Blüte stehen!"],
    ["Gaudeamus Str. 7 – Übersetzung", "Es schwinde die Traurigkeit, die Hasser, der Teufel, jeder Antibursch und die Spötter!"],
    ["Farben im Bundeslied", "Blau = Stahl/Treue · Rot = Liebe zum Land der Väter · Gold = Freiheit"],
    ["Abkürzung Letztes Allgemeines", "Für Gastverbindungen deren Verbandshymne oder für alle die EKV-Hymne."]
  ],
  cloze: [],
  order: [
    { t: "Reihenfolge im Letzten Allgemeinen", items: ["Eigene Burschenstrophe", "Strophe der anwesenden Vorortsverbindung", "ÖCV-, MKV-, KÖL-Verbindungen nach amtlicher Reihenfolge", "Fuchsenstrophen in umgekehrter Reihenfolge"] }
  ]
},
{
  id: "chargieren", title: "Chargieren", sub: "Kommandos in Kirche & Kneipe", glyph: "⚔",
  hook: "„Schläger fasst auf – Klinge zieht blank“: Wann genau beim Evangelium, wann bei der Wandlung?",
  story: [
    { t: "Grundregeln", h: `<p>Chargieren lernt man vor allem durch <b>Übung</b> – nutze jede Chance in der Fuchsenzeit. Bei der Prüfung kann es praktisch im Rahmen des Komments abgefragt werden.</p>
      <div class="fact">Jeder Einsatz wird <b>vorher besprochen</b> und bei Bedarf geprobt. Kommandos werden <b>NICHT geschrien</b> – meist ziehen nur 3–6 Chargierte auf, normal gesprochen versteht sie jeder.</div>` },
    { t: "In der Messe", h: `<p><b>Einmarsch</b> (nebeneinander), vor dem Presbyterium: <i>„Anfang halt“ – „Schläger stellt ab“ – „Zum Gruß“ – „Vom Gruß“ – „Schläger fasst auf“ – „Rechts um“ – „Im Schritt marsch“</i>. Am Platz: <i>„Anfang halt“ – „Links um“ – „Schläger stellt ab“</i>.</p>
      <ul><li><b>Priester kommt:</b> „Zum Gruß“ · am Altar: „Vom Gruß“</li>
      <li><b>Evangelium:</b> „Schläger fasst auf“ – „Schläger <b>streckt</b>“ · Ende: „Schläger/Klinge versorgt“ – „Schläger stellt ab“</li>
      <li><b>Wandlung:</b> „Schläger fasst auf“ – „Klinge zieht <b>blank</b>“ · Ende: „versorgt“ – „stellt ab“</li>
      <li><b>Vater unser, Glaubensbekenntnis, Segen:</b> Salutieren</li>
      <li><b>Großer Gott, wir loben dich:</b> Strecken</li>
      <li><b>Agnus Dei:</b> Blank ziehen</li>
      <li><b>Auszug:</b> wie der Einzug in umgekehrter Reihenfolge</li></ul>` },
    { t: "Auf der Kneipe", h: `<p>Ein Chargierter salutiert vor und nach dem Sprechen (in der Praxis durchgehend) – <b>nicht</b> beim Singen, beim Salamanderreiben und im Colloquium.</p>
      <p><b>Einzug</b> (hintereinander) nach „Omnes surgite zum Einzug der Chargierten“: <i>„Anfang halt“ – „Links um“ – „Schläger stellt ab“ – „Zum Gruß“ – „Vom Gruß“ – „Schläger fasst auf“ – „Zu den Plätzen abgetreten“</i>. Contrarien ziehen sofort blank oder warten auf „Klinge frei“ (bei Kommersen praktischer).</p>
      <p><b>Eröffnung:</b> Präsid schlägt <b>3×</b> auf (Conpräsiden ab dem 2., Contrarien beim 3. Schlag): „Silentium! XY-Kneipe e.v. K.a.V. Bajuvaria incipit! Es steige das 1. Allgemeine …“ – zur 3. Strophe „Zu Ehren der <b>Wissenschaft</b>“, zur 6. „Zu Ehren unseres <b>Vaterlandes</b>, der Republik Österreich“ – jeweils omnes surgite, Chargierte schlagen auf und strecken. Danach ein breiter Streifen/Schmollis der Sängerschaft.</p>
      <div class="fact">Faustregel beim Zutrinken: <b>PSP</b> – Präsentieren · Salutieren · Präsentieren – trinken – Präsentieren · Salutieren · Präsentieren.</div>
      <p><b>Begrüßungskantus:</b> Strophenweise werden nach den Prinzipien <b>Religio, Patria, Scientia, Amicitia</b> Vertreter begrüßt.</p>
      <p><b>Letztes Allgemeines:</b> zur 2. „Bajuvarias Burschenstrophe, Burschen surgite“, zur 3. „Fuchsenstrophe – Füchse in den 1. Stock, Fuchsmajor und ehemalige Fuchsmajores surgite“ – Chargierte, die nie FM waren, stechen ab. Schluss: „Ein Heil der wackeren Sängerschaft“ – Corona: „<b>Fiducit</b>“.</p>
      <p><b>Verabschiedung:</b> Jedes Contrarium: „Hohes Präsid, hohe Corona! Ich bringe euch meinen letzten Rest und ernenne zu meinem Nachfolger im Inoffizium Bbr. XY“ – der Nachfolger: „Hohe Corona, ich melde meine Niederkunft“. Wer bleibt: „… ich verbleibe im Amt“ (typisch FM vor Branderung). Ohne Nachfolger: „Ich sprenge mich in die Luft.“</p>` }
  ],
  quiz: [
    { q: "Welches Kommando kommt beim Evangelium nach „Schläger fasst auf“?", a: ["Schläger streckt", "Klinge zieht blank", "Zum Gruß", "Schläger stellt ab"], c: 0, e: "Bei der Wandlung: „Klinge zieht blank“." },
    { q: "Was tun die Chargierten während der Wandlung?", a: ["Klinge zieht blank", "Salutieren", "Strecken", "Nichts"], c: 0, e: "Ende: „Schläger/Klinge versorgt“ – „Schläger stellt ab“." },
    { q: "Was tun Chargierte bei Vater unser, Glaubensbekenntnis und Segen?", a: ["Salutieren", "Blank ziehen", "Strecken", "Abstellen"], c: 0, e: "„Großer Gott“: Strecken; Agnus Dei: Blank ziehen." },
    { q: "Was ist beim Agnus Dei zu tun?", a: ["Blank ziehen", "Salutieren", "Strecken", "Zum Gruß"], c: 0, e: "Siehe Chargierablauf Messe." },
    { q: "Wofür steht PSP beim Zutrinken?", a: ["Präsentieren – Salutieren – Präsentieren", "Präsid – Senior – Präsid", "Prosit – Salve – Prosit", "Pause – Strecken – Pause"], c: 0, e: "Vor und nach dem Trinken." },
    { q: "Bei welcher Strophe des Ersten Allgemeinen wird der Wissenschaft die Ehre erwiesen?", a: ["Bei der 3.", "Bei der 1.", "Bei der 4.", "Bei der 6."], c: 0, e: "Zur 6. „Zu Ehren unseres Vaterlandes, der Republik Österreich“." },
    { q: "Wann salutieren Chargierte NICHT?", a: ["Beim Singen, Salamanderreiben und im Colloquium", "Beim Zutrinken", "Beim Sprechen", "Beim Einzug"], c: 0, e: "Sonst vor und nach dem Sprechen." },
    { q: "Wie oft schlägt das Präsid zur Eröffnung auf?", a: ["Dreimal", "Einmal", "Zweimal", "Elfmal"], c: 0, e: "Conpräsiden setzen beim 2., Contrarien beim 3. Schlag ein." },
    { q: "Was sagt ein neues Contrarium bei der Übernahme?", a: ["Hohe Corona, ich melde meine Niederkunft", "Ich sprenge mich in die Luft", "Ich verbleibe im Amt", "Fiducit"], c: 0, e: "„Ich sprenge mich in die Luft“ sagt ein Contrarium, wenn kein Nachfolger nötig ist." },
    { q: "Welche Prinzipien bestimmen die Reihenfolge der Begrüßung?", a: ["Religio, Patria, Scientia, Amicitia", "Amicitia, Scientia, Patria, Religio", "Nach Couleuralter", "Alphabetisch"], c: 0, e: "Strophe für Strophe beim Begrüßungskantus." },
    { q: "Was antwortet die Corona auf „Ein Heil der wackeren Sängerschaft“?", a: ["Fiducit", "Sunt", "Prosit", "Vivat"], c: 0, e: "Schluss des Letzten Allgemeinen." }
  ],
  cards: [
    ["Messe – Evangelium", "Schläger fasst auf – Schläger streckt · Ende: versorgt – stellt ab"],
    ["Messe – Wandlung", "Schläger fasst auf – Klinge zieht blank · Ende: versorgt – stellt ab"],
    ["Messe – Vater unser / Credo / Segen", "Salutieren"],
    ["Messe – Großer Gott", "Strecken"],
    ["Messe – Agnus Dei", "Blank ziehen"],
    ["Kneipe – Zutrinken", "PSP: Präsentieren – Salutieren – Präsentieren – trinken – PSP"],
    ["Kneipe – 1. Allgemeines Ehrungen", "3. Strophe: Wissenschaft · 6. Strophe: Vaterland, Republik Österreich"],
    ["„Ich sprenge mich in die Luft“", "Contrarium beendet sein Amt ohne Nachfolger im Inoffizium (z. B. wenige Kneipanten, Krambambuli)."]
  ],
  cloze: [
    "Beim Evangelium: „Schläger fasst auf“ – „Schläger {{streckt}}“.",
    "Bei der Wandlung: „Schläger fasst auf“ – „Klinge zieht {{blank}}“.",
    "Kommandos werden {{nicht}} geschrien.",
    "Faustregel beim Zutrinken: Präsentieren – {{Salutieren}} – Präsentieren."
  ],
  order: [
    { t: "Einmarsch in der Kirche", items: ["Anfang halt", "Schläger stellt ab", "Zum Gruß", "Vom Gruß", "Schläger fasst auf", "Rechts um", "Im Schritt marsch"] },
    { t: "Einzug auf der Kneipe", items: ["Omnes surgite zum Einzug der Chargierten", "Anfang halt", "Links um", "Schläger stellt ab", "Zum Gruß", "Vom Gruß", "Schläger fasst auf", "Zu den Plätzen abgetreten"] },
    { t: "Chargieren während der Messe", items: ["Priester kommt: Zum Gruß", "Evangelium: Strecken", "Glaubensbekenntnis: Salutieren", "Wandlung: Blank ziehen", "Vater unser: Salutieren", "Agnus Dei: Blank ziehen", "Segen: Salutieren"] }
  ]
},
{
  id: "messe", title: "Messablauf & Grundgebete", sub: "Liturgie, Eucharistie, Gebete", glyph: "✝",
  hook: "„Ite, missa est“ – warum heißt die Messe eigentlich Messe?",
  story: [
    { t: "Liturgie – Dienst für das Volk", h: `<p><b>Liturgie</b> kommt vom griechischen <i>leitos</i> (zum Volk gehörig) und <i>ergon</i> (Dienst, Werk) – Dienst <i>des</i> oder <i>für das</i> Volk. Sie ist die zeichenhafte, öffentliche Handlungsgemeinschaft Christi und seiner Kirche zur <b>Heiligung des Menschen</b> und <b>Verherrlichung Gottes</b>.</p>
      <div class="fact">Zwei Dimensionen: <b>katabatisch</b> (Gott handelt am Menschen – „herab“) und <b>anabatisch</b> (der Mensch verherrlicht Gott – „hinauf“).</div>
      <p>Merkmale: Liturgie ist <b>Dialog</b>; sie vollzieht sich in <b>Zeichen und Symbolen</b>; recht vollzogen vermittelt sie <b>Gnade</b> (aber: <i>Gratia non alligatur sacramentis</i>); sie ist <b>Vorverkündigung der Vollendung</b> und Aufruf zu kirchlichem Leben (<i>lex orandi – lex vivendi</i>).</p>` },
    { t: "Die Messe – Sakrament der Eucharistie", h: `<p>Die Messe ist der zentrale Gottesdienst der katholischen Kirche – anders als ein Wortgottesdienst mit <b>Eucharistiefeier</b>. Der Name stammt von der Schlussformel <b>„Ite, missa est“</b> („Geht, ihr seid ausgesendet“).</p>
      <p>Jesus selbst hat die Eucharistie beim <b>Letzten Abendmahl</b> eingesetzt. Sie ist Erinnerung und Vergegenwärtigung von Abendmahl, Kreuzestod, Auferstehung, Himmelfahrt – daher „<b>Messopfer</b>“ – und zugleich „<b>Ostermahl</b>“. „Kommunion“ kommt von <i>communio</i> = <b>Gemeinschaft</b>.</p>
      <p>Christus ist mehrfach gegenwärtig: in der <b>Eucharistie</b> (Brot und Wein werden wesenhaft zu Leib und Blut Christi gewandelt), in seinem <b>Wort</b>, im <b>Priester</b> und in der <b>versammelten Gemeinde</b>.</p>
      <div class="tip">Ordentliche Form = Missale Romanum nach dem 2. Vatikanum (1962–65). Die Form von 1962 erlaubte Benedikt XVI. 2007 (<i>Summorum Pontificum</i>) wieder als „außerordentliche Form“; Franziskus schränkte sie 2021 (<i>Traditionis Custodes</i>) stark ein.</div>
      <p><b>Ordinarium</b> = immer gleiche Teile (z. B. eines von vier Hochgebeten); <b>Proprium</b> = wechselnde Teile (z. B. Lesungen – weltweit für alle Katholiken gleich).</p>` },
    { t: "Die vier Teile der Messe", h: `<ol><li><b>Eröffnung</b> – Einzug, liturgischer Gruß, Schuldbekenntnis, Kyrie, Gloria (Sonn- und Festtage, nicht im Advent/Fastenzeit), Tagesgebet <i>(stehen)</i></li>
      <li><b>Wortgottesdienst</b> – 1. Lesung (meist AT), Antwortpsalm, 2. Lesung (meist NT), Ruf vor dem Evangelium (Halleluja), Evangelium, Homilie, Glaubensbekenntnis, Fürbitten</li>
      <li><b>Eucharistiefeier</b> – Gabenbereitung, Gabengebet, <b>Hochgebet</b> (Präfation, Sanctus, Epiklese, Einsetzungsbericht mit Wandlungsworten, Akklamation, Anamnese, Interzessionen, Doxologie), Kommunion (Vater unser, Friedensgruß, Brotbrechung, Agnus Dei, Kommunionspendung), Schlussgebet</li>
      <li><b>Entlassung</b> – Ankündigungen, Segen, „Gehet hin in Frieden“, Auszug</li></ol>
      <div class="fact">Während des <b>Einsetzungsberichts</b> wird jedenfalls <b>gekniet</b>; spätestens mit Ende des Hochgebets ist die Wandlung vollzogen.</div>` }
  ],
  special: "texte:gebete",
  quiz: [
    { q: "Woher leitet sich das Wort „Messe“ ab?", a: ["„Ite, missa est“", "lat. „mensa“ (Tisch)", "„Messias“", "griech. „mesos“"], c: 0, e: "Geht, ihr seid ausgesendet – auf Deutsch „Gehet hin in Frieden“." },
    { q: "Was bedeutet „katabatisch“?", a: ["Gott handelt am Menschen", "Der Mensch verherrlicht Gott", "Feier ohne Priester", "Der Wortgottesdienst"], c: 0, e: "Anabatisch = Verherrlichung Gottes durch den Menschen." },
    { q: "Aus welchen vier Teilen besteht die Messe?", a: ["Eröffnung, Wortgottesdienst, Eucharistiefeier, Entlassung", "Kyrie, Gloria, Credo, Sanctus", "Einzug, Predigt, Kommunion, Segen", "Ordinarium, Proprium, Kanon, Auszug"], c: 0, e: "Wortgottesdienst und Eucharistiefeier, gerahmt von Eröffnung und Entlassung." },
    { q: "Was bedeutet „communio“?", a: ["Gemeinschaft", "Brot", "Opfer", "Dank"], c: 0, e: "Kommunion stiftet Gemeinschaft mit Christus und untereinander." },
    { q: "Wann wird jedenfalls gekniet?", a: ["Während des Einsetzungsberichts", "Beim Evangelium", "Beim Gloria", "Beim Schlussgebet"], c: 0, e: "Beim Evangelium wird gestanden." },
    { q: "Was ist das „Proprium“?", a: ["Die von Tag zu Tag wechselnden Teile", "Die immer gleichen Teile", "Das Hochgebet", "Die Predigt"], c: 0, e: "Ordinarium = gleichbleibend." },
    { q: "Auf welche Einladung antworten wir „Herr, ich bin nicht würdig …“?", a: ["„Seht das Lamm Gottes …“", "„Erhebet die Herzen“", "„Geheimnis des Glaubens“", "„Der Friede des Herrn …“"], c: 0, e: "Einladung zur Kommunion." },
    { q: "Antwort auf „Erhebet die Herzen“?", a: ["Wir haben sie beim Herrn.", "Und mit deinem Geiste.", "Das ist würdig und recht.", "Dank sei Gott."], c: 0, e: "Danach: „Lasset uns danken …“ – „Das ist würdig und recht.“" },
    { q: "Antwort nach dem Evangelium?", a: ["Lob sei dir, Christus.", "Ehre sei dir, o Herr.", "Dank sei Gott.", "Amen."], c: 0, e: "Vor dem Evangelium: „Ehre sei dir, o Herr.“" },
    { q: "Welches Motu proprio schränkte 2021 die alte Messform ein?", a: ["Traditionis Custodes", "Summorum Pontificum", "Rerum novarum", "Lumen gentium"], c: 0, e: "Summorum Pontificum (2007) hatte sie wieder erlaubt." }
  ],
  cards: [
    ["Liturgie – Wortherkunft", "griech. leitos (zum Volk gehörig) + ergon (Dienst) → Dienst des/für das Volk"],
    ["Katabatisch / anabatisch", "Gott handelt am Menschen / Mensch verherrlicht Gott"],
    ["Gratia non alligatur sacramentis", "Gottes Gnade ist nicht an die Sakramente gebunden."],
    ["Vier Teile der Messe", "Eröffnung – Wortgottesdienst – Eucharistiefeier – Entlassung"],
    ["Gegenwart Christi in der Messe", "Eucharistie · Wort · Priester · versammelte Gemeinde"],
    ["Teile des Hochgebets", "Präfation, Sanctus, Epiklese, Einsetzungsbericht, Akklamation, Anamnese, Interzessionen, Doxologie"],
    ["„Geheimnis des Glaubens“ – Antwort", "Deinen Tod, o Herr, verkünden wir und deine Auferstehung preisen wir, bis du kommst in Herrlichkeit."],
    ["Nach den Lesungen", "L: Wort des lebendigen Gottes. – A: Dank sei Gott."],
    ["Entlassung", "P: Gehet hin in Frieden. – A: Dank sei Gott, dem Herrn."]
  ],
  cloze: [
    "Der Herr sei mit euch. – Und mit deinem {{Geiste}}.",
    "Erhebet die Herzen. – Wir haben sie beim {{Herrn}}.",
    "Lasset uns danken dem Herrn, unserm Gott. – Das ist {{würdig}} und recht.",
    "Aus dem heiligen Evangelium nach N. – Ehre sei dir, o {{Herr}}.",
    "Evangelium unseres Herrn Jesus Christus. – Lob sei dir, {{Christus}}."
  ],
  order: [
    { t: "Ablauf der Messe", items: ["Einzug", "Liturgischer Gruß", "Schuldbekenntnis", "Kyrie", "Gloria", "Tagesgebet", "Erste Lesung", "Antwortpsalm", "Zweite Lesung", "Ruf vor dem Evangelium", "Evangelium", "Homilie", "Glaubensbekenntnis", "Fürbitten", "Gabenbereitung", "Gabengebet", "Eucharistisches Hochgebet", "Vater unser", "Friedensgruß", "Agnus Dei", "Kommunion", "Schlussgebet", "Segen und Entlassung", "Auszug"] },
    { t: "Das Eucharistische Hochgebet", items: ["Präfation mit Eröffnungsdialog", "Sanctus", "Postsanctus", "Konsekrationsepiklese", "Einsetzungsbericht mit Wandlungsworten", "Akklamation", "Anamnese mit Kommunikantenepiklese", "Interzessionen", "Doxologie"] }
  ]
},
{
  id: "satzungen", title: "Satzungen", sub: "Prinzipien, Farben, Wahlspruch", glyph: "❖",
  hook: "Sieben Paragraphen, die unser ganzes Verbindungsleben tragen.",
  story: [
    { t: "Das Fundament", h: `<p>Die Satzungen enthalten die wichtigsten Grundsätze der Bajuvaria. Wörtlich auswendig musst du sie nicht können, aber <b>jeden Punkt genau inhaltlich</b>.</p>
      <ul><li><b>§ 1</b> – Gemeinschaft katholischer Akademiker mit den vier Prinzipien <b>Katholizismus, Vaterlandsliebe, Lebensfreundschaft, Wissenschaftlichkeit</b>.</li>
      <li><b>§ 2 Religio</b> – vorbehaltslose katholische Weltanschauung und Lebensführung; daher Ablehnung von <b>Duell und Mensur</b>.</li>
      <li><b>§ 3 Patria</b> – Bekenntnis zu Volk und Heimat, Dienst am Vaterland mit Aufgeschlossenheit gegenüber der ganzen Welt; die Verbindung hält sich von <b>Tagespolitik</b> fern.</li>
      <li><b>§ 4 Scientia</b> – Studium mit größtem Fleiß; Haltung zu staatlichen, wirtschaftlichen, sozialen und religiösen Fragen.</li>
      <li><b>§ 5 Amicitia</b> – alle gleichberechtigt, aufrichtige Lebensfreundschaft, „<b>Du</b>“; Ehre der Bundesbrüder wahren; Recht und Pflicht, auf Verfehlungen liebevoll aufmerksam zu machen. „Seinen besten Freund soll jedes Mitglied unter den Bundesbrüdern besitzen.“</li>
      <li><b>§ 6 Farben</b> – Blau-Rot-Gold, getragen um 1. studentische Sitte zu pflegen, 2. Grundsätze öffentlich zu bekennen, 3. akademische Standesehre zu bekräftigen, 4. verantwortliche Zusammengehörigkeit zu stärken; Beschreibung von Mütze, Burschen- und Fuchsenband.</li>
      <li><b>§ 7</b> – Wahlspruch „<b>Für Volk und Glauben!</b>“</li></ul>
      <div class="tip">Rangordnung der Rechtstexte: Satzungen → Statuten (vereinsrechtlich, bei der Vereinsbehörde hinterlegt) → GO. Satzungen werden vom BC mit <b>4/5</b>, die GO mit <b>2/3</b> beschlossen.</div>` }
  ],
  quiz: [
    { q: "Welche vier Prinzipien nennt § 1?", a: ["Katholizismus, Vaterlandsliebe, Lebensfreundschaft, Wissenschaftlichkeit", "Gott, Ehre, Freiheit, Vaterland", "Glaube, Hoffnung, Liebe, Treue", "Religio, Libertas, Patria, Honor"], c: 0, e: "Entspricht Religio, Patria, Amicitia, Scientia." },
    { q: "Warum lehnt Bajuvaria Duell und Mensur ab?", a: ["Wegen der katholischen Weltanschauung (§ 2)", "Aus Kostengründen", "Wegen des Vereinsgesetzes", "Wegen der Tagespolitik"], c: 0, e: "Vorbehaltslose katholische Lebensführung." },
    { q: "Wovon hält sich die Verbindung laut § 3 fern?", a: ["Von jeder Tagespolitik", "Von der Kirche", "Vom ÖCV", "Von Kneipen"], c: 0, e: "Bekenntnis zu Volk und Heimat, aber keine Tagespolitik." },
    { q: "Welcher Grund für das Farbentragen steht NICHT in § 6?", a: ["Abgrenzung von anderen Studenten", "Studentische Sitte pflegen", "Grundsätze öffentlich bekennen", "Zusammengehörigkeit stärken"], c: 0, e: "Vier Gründe: Sitte, Bekenntnis, Standesehre, Zusammengehörigkeit." },
    { q: "Mit welcher Mehrheit werden die Satzungen beschlossen?", a: ["4/5", "2/3", "einfache Mehrheit", "einstimmig"], c: 0, e: "Die GO mit 2/3." }
  ],
  cards: [
    ["§ 1 Satzungen", "Gemeinschaft katholischer Akademiker; vier Prinzipien: Katholizismus, Vaterlandsliebe, Lebensfreundschaft, Wissenschaftlichkeit"],
    ["§ 2 Satzungen", "Vorbehaltslose katholische Weltanschauung → Ablehnung von Duell und Mensur"],
    ["§ 3 Satzungen", "Bekenntnis zu Volk und Heimat; weltoffen; keine Tagespolitik"],
    ["§ 4 Satzungen", "Studium mit größtem Fleiß; Haltung zu Problemen des Lebens"],
    ["§ 5 Satzungen", "Gleichberechtigung, Lebensfreundschaft, „Du“, Ehrenschutz, brüderliche Zurechtweisung"],
    ["§ 6 Satzungen – 4 Gründe für Farben", "Sitte · Bekenntnis · Standesehre · Zusammengehörigkeit"],
    ["§ 7 Satzungen", "Wahlspruch: „Für Volk und Glauben!“"]
  ],
  cloze: [
    "Bajuvaria lehnt {{Duell}} und {{Mensur}} ab.",
    "Die Verbindung als solche hält sich von jeder {{Tagespolitik}} fern.",
    "Seinen besten {{Freund}} soll jedes Mitglied unter den Bundesbrüdern besitzen.",
    "Der Wahlspruch lautet: „Für {{Volk}} und {{Glauben}}!“"
  ],
  order: []
},
{
  id: "studgesch", title: "Studentengeschichte", sub: "Von den Scholaren bis heute", glyph: "⌛",
  hook: "Bursch, Philister, Fuchs, Kneipe – jedes dieser Wörter hat eine Geschichte von Jahrhunderten.",
  story: [
    { t: "Mittelalter: Klöster, Universitäten, Bursen", h: `<p>Im Mittelalter waren <b>Klöster</b> die einzigen Stätten der Bildung; daraus entstanden kirchennahe Schulen und schließlich <b>Universitäten</b> – <i>universitas magistrorum et scholarium</i>, die Gesamtheit der Lehrer und Schüler. Erste Universität: <b>Bologna 1088</b>, dann die Pariser <b>Sorbonne um 1200</b>.</p>
      <p>Studenten waren international unterwegs und als Landesfremde schutzlos. Darum erließ Kaiser <b>Friedrich I. Barbarossa 1155</b> das <b>Scholarenprivileg</b> (Schutz und Gerichtsstand). Die Universitäten gliederten sich in <b>nationes</b> nach Herkunft, die auch den Rektor wählten.</p>
      <p>Studenten wohnten in <b>Bursen</b> – <i>bursa</i> = Geldbeutel, weil man aus einer gemeinsamen Kasse lebte. Der Bewohner hieß <i>bursarius</i> → „<b>Bursch</b>“.</p>
      <div class="fact">Im Deutschen Reich: <b>Prag 1348</b> (Karl IV.), <b>Wien 1365</b> (Herzog Rudolf IV. „der Stifter“ – Gründungstag 12.3., <i>Alma Mater Rudolfina Vindobonensis</i>), <b>Heidelberg</b> (laut Skript 1368, in der Literatur meist 1386); Krakau schon 1364.</div>
      <p>Das <b>Barett</b> ist das älteste studentische Attribut. <b>Kaiser Maximilian I.</b> gewährte den Studenten <b>1514</b> das Recht, einen <b>Degen</b> zu tragen – bis dahin dem Adel vorbehalten (die Promotion war bis ins 18. Jh. auch mit dem Adelsstand verbunden; Studenten waren oft fremd und schutzlos).</p>` },
    { t: "Landsmannschaften, Pennalismus, Deposition", h: `<p>Mit wachsender Macht der Landesherren schwanden die nationes; aus ihnen entstanden die <b>Landsmannschaften</b> – Korporationen aller Studenten aus einem Land. Ab ca. 1500 gab es die rohe Aufnahmezeremonie der <b>Deposition</b> (für den <i>beanus</i>, „Gelbschnabel“) – ein Rest lebt in der <b>Branderung</b> weiter.</p>
      <p>Ab ca. 1600 das <b>Pennaljahr</b> (von <i>penna</i>, Feder): Anfänger mussten Älteren dienen, jedem wurde ein <b>Leibbursch</b> zugeteilt – erster Anknüpfungspunkt der Bierfamilie (heute zum Glück umgekehrt). Wilde Umtriebe, Duelle (ab 1560 Exzesse, um 1600 Regeln – die „<b>Mensur</b>“ war ursprünglich das Abmessen des Duellplatzes), das <i>Ius potandi</i> (1611/1616). <b>1654</b> verbot der Reichstag den Pennalismus – die Landsmannschaften alten Stils hielten sich aber lange, auch weil sie im Geheimen gediehen.</p>
      <p><b>„Philister“</b> war zunächst ein biblischer Gegner des Wortes Gottes, dann Spottname für Obrigkeit und Spießbürger, schließlich für jeden Nicht(mehr)-Studenten. Ab 1600 entsteht eine eigene <b>Studentensprache</b> (Latein-Deutsch-Mix, „burschikos“).</p>
      <p>Landsmannschaften <b>neuen Stils</b> (bis 18. Jh.): feinere Manieren, Leibbursch als Schützer, Farben (meist Landesfarben). Seit ca. <b>1700 „Fuchs“</b>, im 18. Jh. Krassfuchs (1. Semester) und Brandfuchs (2. Semester).</p>` },
    { t: "Trinkkultur & Studentenorden", h: `<p>Im 17./18. Jh. lud man einander zu Gelagen mit <b>Präsidium</b> (Stock oder Hieber als Zeichen) – die Urform der Kneipe. Um 1790 hieß das „<b>Kommers</b>“; „<b>Kneipe</b>“ war zunächst die Studentenwohnung (belegt 1793). 1750 erschien das erste <b>Kommersbuch</b>, seit 1778 heißt die Festtracht „<b>Wichs</b>“; die <b>Doctorpromotion</b> entstand als Bierspiel.</p>
      <p>Mit der Aufklärung entstand nach freimaurerischem Vorbild der <b>Studentenorden</b>: erstmals politisch-weltanschauliche Ziele, <b>Treueeid</b> samt Schweigepflicht (→ Conventsgeheimnis), die Idee des <b>Lebensbundes</b>, <b>Zirkel</b> (aus der Geheimschrift) und Chargenkürzel.</p>
      <p>Aus Landsmannschaften und Orden entstand um die Französische Revolution das <b>Corps</b> (militärische Traditionen; älteste bestehende: Guestphalia Halle und Onoldia Erlangen, 1798). Seither <b>drei Farben</b> nach Vorbild der Trikolore; ab 1790 Korbschläger, um 1800 Wappen, ab 1805 <b>Couleurnamen</b> (Biertaufe).</p>` },
    { t: "Burschenschaft, Metternich & das 19. Jahrhundert", h: `<p>In den Befreiungskriegen 1813/14 kämpfte das <b>Lützow’sche Freicorps</b> – fast nur Studenten in <b>Schwarz-Rot-Gold</b>. 1815 gründeten Heimkehrer in Jena die <b>Urburschenschaft</b> (Gasthaus „Grüne Tanne“ – Kantus „Sind wir vereint“). <b>1817 Wartburgfest</b>, Gründung der <b>Allgemeinen Deutschen Burschenschaft</b>: Schwarz-Rot-Gold, Wahlspruch „<b>Gott, Ehre, Freiheit, Vaterland</b>“, anfangs Ächtung des Duells, schlichte Kleidung, zivilisierter Umgang mit Frauen (→ Couleurdame).</p>
      <p>Gestoppt durch den Mord des Studenten <b>Carl Sand an Kotzebue 1819</b> → <b>Karlsbader Beschlüsse</b> (Metternich): Verbot aller Verbindungen (Kantus „Wir hatten gebauet“). Trotzdem entstehen Cerevis (1820), Stürmer (nach 1830), Band (1800/1830), Deckel (ab 1830), Branderung, Ritterschlag bei der Burschung (1843), Salamander.</p>
      <p>Strömungen: Burschenschaften spalten sich in Gemäßigte und Radikale; erste konfessionelle Verbindungen – evangelisch <b>Uttenruthia Erlangen</b> (1828/1836), katholisch <b>Bavaria Bonn 1844</b>, Schweizer <b>StV 1841</b>; farbentragende Katholiken einen sich ab <b>1856 im CV</b>, nicht farbentragende ab 1865 im KV. 1848 Revolution, danach Verbot in Österreich (bis <b>1862</b>). Corps werden liberal-elitär, die „Neuburschenschaften“ radikal national, „Los von Rom“, antisemitisch.</p>` },
    { t: "Kulturkampf, NS-Zeit, Nachkriegszeit", h: `<p>Ende des 19. Jh.: <b>akademischer Kulturkampf</b>. Schlagende Verbände sprachen den katholischen Verbindungen das Recht auf Wichs und Schläger ab („unehrenhaft“ und „undeutsch“). In Österreich herrschte der „<b>Knüppelcomment</b>“ – bis 1938, mit Toten. Das Auftreten von Austria und Norica in Couleur 1889 löste die „<b>Austernschlacht</b>“ aus. 1890 stellte der Heilige Stuhl klar: Katholiken dürfen keine Mensuren fechten.</p>
      <p>1918 Aufhebung des Koalitionsverbots für Schüler (→ Pennalien). <b>Erlanger Verbändeabkommen 1921</b>. Der Nationalsozialismus löste alle Verbindungen auf – auch die deutschnationalen („Gleichschaltung“): Totalitäre Staaten dulden keine Zivilgesellschaft.</p>
      <p>Seit <b>1945</b> hat in Österreich der CV klar die Oberhand; zum nationalen Lager herrscht „<b>Eiszeit</b>“. In Deutschland ist das Verhältnis entspannter. Studentinnenverbindungen entstanden in Österreich erst in der Zweiten Republik.</p>` }
  ],
  quiz: [
    { q: "Welche ist die älteste Universität?", a: ["Bologna 1088", "Paris um 1200", "Prag 1348", "Wien 1365"], c: 0, e: "Paris (Sorbonne) war die erste außerhalb Italiens." },
    { q: "Wer erließ 1155 das Scholarenprivileg?", a: ["Friedrich I. Barbarossa", "Karl IV.", "Maximilian I.", "Rudolf IV."], c: 0, e: "Es gewährte den fremden Studenten Schutz und Gerichtsstand." },
    { q: "Woher kommt das Wort „Bursch“?", a: ["bursa = Geldbeutel → bursarius", "Burg", "Bursche = Knecht", "burschikos (griech.)"], c: 0, e: "Bursen lebten aus einem gemeinsamen Geldbeutel." },
    { q: "Wann und von wem wurde die Universität Wien gegründet?", a: ["1365, Herzog Rudolf IV.", "1348, Karl IV.", "1386, Albrecht III.", "1514, Maximilian I."], c: 0, e: "Gründungstag 12.3.; Alma Mater Rudolfina." },
    { q: "Welches Recht gewährte Maximilian I. 1514?", a: ["Das Tragen eines Degens", "Das Tragen von Farben", "Eigene Gerichtsbarkeit", "Das Wahlrecht"], c: 0, e: "Bis dahin dem Adel vorbehalten." },
    { q: "Welcher heutige Brauch geht auf die „Deposition“ zurück?", a: ["Die Branderung", "Der Salamander", "Der Landesvater", "Die Burschung"], c: 0, e: "Rohe Aufnahmezeremonie für den beanus ab ca. 1500." },
    { q: "Wann verbot der Reichstag den Pennalismus?", a: ["1654", "1611", "1819", "1700"], c: 0, e: "Ausrottung dauerte aber lange." },
    { q: "Was brachten die Studentenorden ins Korporationswesen?", a: ["Lebensbund, Treueeid, Zirkel", "Duell und Mensur", "Das Fuchsenband", "Die Landsmannschaft"], c: 0, e: "Nach freimaurerischem Vorbild, aufklärerisch geprägt." },
    { q: "Wo wurde 1815 die Urburschenschaft gegründet?", a: ["Jena", "Wartburg", "Wien", "Heidelberg"], c: 0, e: "Gasthaus „Grüne Tanne“; 1817 dann das Wartburgfest." },
    { q: "Wahlspruch der Allgemeinen Deutschen Burschenschaft?", a: ["Gott, Ehre, Freiheit, Vaterland", "Ehre, Freiheit, Vaterland", "Für Volk und Glauben", "Vivat, crescat, floreat"], c: 0, e: "Farben Schwarz-Rot-Gold." },
    { q: "Was stoppte den Aufstieg der Burschenschaften 1819?", a: ["Die Karlsbader Beschlüsse nach dem Kotzebue-Mord", "Die Revolution 1848", "Napoleon", "Das Wartburgfest"], c: 0, e: "Initiiert von Metternich." },
    { q: "Erste explizit katholische Verbindung?", a: ["Bavaria Bonn 1844", "Aenania München 1851", "Austria Innsbruck 1864", "Uttenruthia Erlangen"], c: 0, e: "Uttenruthia ist evangelisch." },
    { q: "Was war die „Austernschlacht“?", a: ["Angriffe auf Austria und Norica beim Couleurauftreten 1889", "Ein Bierspiel", "Ein Wartburg-Ritual", "Eine Schlacht 1866"], c: 0, e: "Teil des akademischen Kulturkampfs." },
    { q: "Seit wann sind Couleurnamen nachgewiesen?", a: ["1805", "1700", "1855", "1920"], c: 0, e: "Vergeben durch die Biertaufe." }
  ],
  cards: [
    ["Universitas", "universitas magistrorum et scholarium – Gesamtheit der Lehrer und Schüler"],
    ["Scholarenprivileg", "1155, Friedrich I. Barbarossa – Schutz und Gerichtsstand für wandernde Studenten → nationes"],
    ["Bursa", "Geldbeutel; Burse = Studentenheim mit gemeinsamer Kasse → bursarius → Bursch"],
    ["Erste Unis im Reich", "Prag 1348 · Wien 1365 · Heidelberg (Skript: 1368)"],
    ["Deposition", "Rohe Aufnahme des beanus ab ca. 1500 → Rest: Branderung"],
    ["Pennaljahr", "ab ca. 1600, Lehr- und Probezeit (penna = Feder), Leibbursch → Bierfamilie; Verbot 1654"],
    ["Philister", "Biblischer Gegner → Spießbürger/Obrigkeit → jeder Nicht(mehr)student"],
    ["Studentenorden", "Aufklärung; Treueeid, Lebensbund, Zirkel, Chargenkürzel"],
    ["Corps", "Um 1800 aus Landsmannschaften + Orden; älteste: Guestphalia Halle, Onoldia Erlangen (1798)"],
    ["Urburschenschaft", "Jena 1815, Gasthaus „Grüne Tanne“"],
    ["Wartburgfest", "1817 – Allgemeine Deutsche Burschenschaft; Schwarz-Rot-Gold; Gott, Ehre, Freiheit, Vaterland"],
    ["Karlsbader Beschlüsse", "1819 nach Kotzebue-Mord (Carl Sand) – Verbindungsverbot (Metternich)"],
    ["CV / KV", "Farbentragende katholische Verbindungen ab 1856 im CV, nicht farbentragende ab 1865 im KV"],
    ["Knüppelcomment", "Gewalt gegen katholische Verbindungen im Kulturkampf – in Österreich bis 1938"]
  ],
  cloze: [
    "Die erste Universität entstand {{1088}} in {{Bologna}}.",
    "Kaiser Maximilian I. gewährte den Studenten {{1514}} das Recht, einen {{Degen}} zu tragen.",
    "Der Reichstag verbot den Pennalismus im Jahr {{1654}}.",
    "Die Urburschenschaft wurde 1815 in {{Jena}} gegründet.",
    "Die Karlsbader Beschlüsse von {{1819}} verboten alle Studentenverbindungen."
  ],
  order: [
    { t: "Zeitleiste Studentengeschichte", items: ["Bologna (1088)", "Scholarenprivileg (1155)", "Universität Prag (1348)", "Universität Wien (1365)", "Degenrecht durch Maximilian I. (1514)", "Pennalismus-Verbot (1654)", "Urburschenschaft Jena (1815)", "Wartburgfest (1817)", "Karlsbader Beschlüsse (1819)", "Bavaria Bonn (1844)", "Gründung des CV (1856)"] }
  ]
},
{
  id: "verbgesch", title: "Geschichte der Verbindung & des ÖCV", sub: "Bajuvaria 1920 bis heute", glyph: "⚑",
  hook: "Fünf Maturanten, eine Pfarre im 3. Bezirk – und eine Fahne, die bis nach Norddeutschland flüchtete.",
  story: [
    { t: "Die Gründung 1920", h: `<p>Bajuvaria wurde am <b>19. Juni 1920</b> gegründet von <b>Eduard Chaloupka v. Isegrim</b> (Gründungssenior), <b>Otto Krammer v. Struwwelpeter</b> (Gründungsfuchsmajor), <b>Hans Löw v. Methusalem</b>, <b>Josef Nagler v. Klecks</b> und <b>Ernst Rechtlehner v. Teddy</b>.</p>
      <p>Zuvor gründeten die fünf <b>1919 die Mittelschulverbindung Frankonia</b>, später auch die <b>Vandalia</b> (beide heute MKV) – möglich durch die neue <b>Koalitionsfreiheit</b> für Schüler. Ihr Plan nach Schweizer Vorbild: eine Aktivitas mit zwei Sektionen aus Schülern und Studenten – rechtlich noch nicht möglich. Versuche, über eine bestehende CV-Verbindung (Franco-Bavaria) oder mehrere Pennalien zu gründen, scheiterten – also gründeten sie selbst.</p>
      <p>Bajuvaria war eng mit der <b>Pfarre St. Rochus</b> (3. Bezirk) verbunden; im Dezember 1921 entstand die erste Bude im Pfarrhof, einen Stock über der heutigen Frankonenbude.</p>` },
    { t: "Aufzugsrecht, Trennungsstreifen, CV-Aufnahme", h: `<p>Das <b>Aufzugsrecht</b> (Recht, in Farben auf akademischem Boden aufzutreten) erhielt Bajuvaria am <b>18.1.1923</b> – Saxonia, Allemania und Rabenstein erhoben wegen ähnlicher Farben Einspruch, der Rektor zog es zurück. Lösung: die bis heute bestehenden <b>Trennungsstreifen</b>.</p>
      <p>CV-Aufnahme: erster Antrag <b>1924 abgelehnt</b> (deutsche Verbindungen fürchteten weiteren österreichischen Stimmenzuwachs), <b>1929 freie Vereinigung</b>, <b>1932</b> Vollmitgliedschaft auf der letzten gemeinsamen Cartellversammlung in Wien.</p>` },
    { t: "NS-Zeit und Widerstand", h: `<p>Am <b>16.3.1938</b> wurde Bajuvaria von der Gestapo aufgelöst. Die Lage im 3. Bezirk half, Eigentum zu retten – vor allem die <b>Prunkfahne</b> (1924 geweiht von Bundeskanzler <b>Ignaz Seipel</b>, erstes Ehrenmitglied), die eine abenteuerliche Irrfahrt bis nach Norddeutschland überstand.</p>
      <p>Bundesbruder <b>Max Gererstorfer</b> starb 1945 in der Schlacht um Wien, als er für die Widerstandsgruppe <b>O5</b> Kontakt mit der Roten Armee aufnehmen wollte.</p>` },
    { t: "Nach 1945", h: `<p>Schon im <b>Mai 1945</b> war Bajuvaria wieder aktiv. <b>Eduard Chaloupka</b> – Präsidialchef des Bundeskanzleramts 1947–1967 und 1955–1967 Vorsitzender des ÖCV-Beirats – erhielt postum als einziger Bajuvare das <b>Wollek-Band</b>. 1950 halfen Bajuvaren bei der Abwehr des „Kommunistenputsches“.</p>
      <div class="fact">Legendär: Kommers zum <b>35. Stiftungsfest am 14.5.1955</b> – Vorabend der Staatsvertragsunterzeichnung. <b>Julius Raab</b> erhielt das Ehrenband; anwesend war <b>Leopold Figl</b> (Ehrenband schon 1947).</div>
      <p>Buden: 1956 <b>Walfischgasse</b>, dann die heutige Bude in der <b>Naglergasse</b>, geweiht am <b>20.11.1982</b> als „Dr. Eduard Chaloupka-Bude“ (neu gestaltet 2007 und 2017).</p>
      <p><b>Vorort</b>: 1968/69 (VOP Claus Raidl v. Roland), 1972/73 (Walter Schwarz v. Wandervogel), 1996/97 (Philipp Schulmeister v. Drum Bun), 2017/18 (Michael Jayasekara v. Django). Das Jubelsemester „100 Jahre“ 2020 fiel großteils Corona zum Opfer; es erschien „Für Volk und Glauben“ (Gerhard Hartmann v. Henoch).</p>` },
    { t: "Geschichte des ÖCV", h: `<p><b>1851</b> gründete Lorenz Gerbl in München die <b>Aenania</b> (1852 Farben, 1853 Katholizitätsprinzip). Am <b>6.12.1856</b> vereinbarten Aenania und <b>Winfridia Breslau</b> Freundschaft und gegenseitigen Schutz – Geburtsstunde des CV und Grundlage der <b>Verkehrsaktivenschaft</b>. 1863 erste Cartellversammlung am Katholikentag in Frankfurt.</p>
      <p><b>1864 Austria Innsbruck</b> – erste österreichische katholische farbentragende Verbindung. 1876 Austria Wien, 1883 Norica (1884 im CV). Versuche eines eigenen ÖCV scheiterten zweimal (1889; dann Austria mit Töchtern Rudolfina, Nordgau, Kürnberg) – 1906 traten alle dem CV bei.</p>
      <p>1933 gelobte der Vorort Aenania Hitler die Treue; deutsche Verbindungen forderten den Ausschluss von Dollfuß, Schuschnigg und Vaugoin. Darauf trennten sich die österreichischen Verbindungen am <b>10. Juli 1933</b> – <b>Gründung des ÖCV unter dem Vorort Norica</b> (im selben Jahr der MKV). Viele verliehen Dollfuß demonstrativ das Band – auch Bajuvaria.</p>
      <p>1938 wurden Figl, Gorbach, Hurdes, Maleta u. a. ins KZ deportiert (Kommers zum 50. Stiftungsfest Carolinae in Dachau). Widerstandsgruppe „<b>Standarte 105</b>“ (= CV), Vorort Carolina im Untergrund, 1940 Gründung der Alpinia. Nach 1945 konsequente Entnazifizierung, starke Rolle im Staat (1945–70 stets ÖCVer Bundeskanzler), <b>1975 Gründung des EKV</b>.</p>` }
  ],
  quiz: [
    { q: "Wann wurde Bajuvaria gegründet?", a: ["19. Juni 1920", "18. Jänner 1923", "6. Dezember 1856", "10. Juli 1933"], c: 0, e: "Von fünf Gründungsburschen." },
    { q: "Wer war Gründungssenior?", a: ["Eduard Chaloupka v. Isegrim", "Otto Krammer v. Struwwelpeter", "Hans Löw v. Methusalem", "Ignaz Seipel"], c: 0, e: "Krammer v. Struwwelpeter war Gründungsfuchsmajor." },
    { q: "Welche Mittelschulverbindung gründeten die fünf 1919?", a: ["Frankonia", "Vandalia", "Franco-Bavaria", "Austria"], c: 0, e: "Später auch Vandalia; beide heute im MKV." },
    { q: "Warum bekam Bajuvaria Trennungsstreifen im Band?", a: ["Einspruch schlagender Verbindungen wegen ähnlicher Farben", "Auf Wunsch des CV", "Wegen der Pfarre St. Rochus", "Nach dem Krieg 1945"], c: 0, e: "Saxonia, Allemania, Rabenstein → Rektor zog das Aufzugsrecht zurück." },
    { q: "Wann wurde Bajuvaria Vollmitglied im CV?", a: ["1932", "1924", "1929", "1945"], c: 0, e: "1924 abgelehnt, 1929 freie Vereinigung." },
    { q: "Wer weihte 1924 die Prunkfahne?", a: ["Bundeskanzler Ignaz Seipel", "Kardinal Innitzer", "Leopold Figl", "Julius Raab"], c: 0, e: "Seipel war erstes Ehrenmitglied." },
    { q: "Was geschah beim 35. Stiftungsfest am 14.5.1955?", a: ["Julius Raab erhielt das Ehrenband – am Vorabend des Staatsvertrags", "Die Bude Naglergasse wurde geweiht", "Bajuvaria stellte den Vorort", "Die Fahne kehrte zurück"], c: 0, e: "Figl war ebenfalls anwesend." },
    { q: "Wann stellte Bajuvaria zum ersten Mal den Vorort?", a: ["1968/69", "1955/56", "1972/73", "1996/97"], c: 0, e: "VOP Claus Raidl v. Roland." },
    { q: "Welche Verbindungen schlossen am 6.12.1856 das Cartellverhältnis?", a: ["Aenania München und Winfridia Breslau", "Austria und Norica", "Bavaria Bonn und Guestphalia", "Carolina und Rudolfina"], c: 0, e: "Gegenseitiger Schutz → Verkehrsaktivenschaft." },
    { q: "Erste österreichische katholische farbentragende Verbindung?", a: ["Austria Innsbruck 1864", "Austria Wien 1876", "Norica 1883", "Carolina 1888"], c: 0, e: "Gegründet von Schedle und Wolf nach dem Katholikentag 1863." },
    { q: "Wann trennte sich der ÖCV vom reichsdeutschen CV?", a: ["10. Juli 1933", "16. März 1938", "1. Mai 1934", "6. Dezember 1856"], c: 0, e: "Unter dem Vorort Norica." },
    { q: "Was bedeutet „Standarte 105“?", a: ["105 = CV in römischen Ziffern", "105 Mitglieder", "Hausnummer", "Jahr 1905"], c: 0, e: "CV-Widerstandsgruppe in der NS-Zeit." },
    { q: "Wann wurde der EKV gegründet?", a: ["1975", "1945", "1955", "1995"], c: 0, e: "Arbeitsgemeinschaft christlicher Korporationsverbände Europas." }
  ],
  cards: [
    ["Gründung Bajuvaria", "19.6.1920 – Isegrim (Senior), Struwwelpeter (FM), Methusalem, Klecks, Teddy"],
    ["Aufzugsrecht", "18.1.1923 verliehen, nach Einspruch zurückgezogen → Trennungsstreifen"],
    ["CV-Aufnahme", "1924 abgelehnt · 1929 freie Vereinigung · 1932 Vollmitglied"],
    ["Auflösung", "16.3.1938 durch die Gestapo; Prunkfahne gerettet"],
    ["Max Gererstorfer", "Widerstandsgruppe O5, fiel 1945 bei Kontaktversuch mit der Roten Armee"],
    ["14.5.1955", "35. Stiftungsfest – Ehrenband für Julius Raab, Vorabend des Staatsvertrags"],
    ["Buden", "Pfarrhof St. Rochus (1921) → Walfischgasse (1956) → Naglergasse (geweiht 20.11.1982)"],
    ["Vororte Bajuvariae", "1968/69 Roland · 1972/73 Wandervogel · 1996/97 Drum Bun · 2017/18 Django"],
    ["Geburtsstunde des CV", "6.12.1856 – Aenania München & Winfridia Breslau"],
    ["Gründung ÖCV", "10.7.1933 Abschaltung vom reichsdeutschen CV, Vorort Norica"],
    ["Wollek-Band", "Höchste ÖCV-Ehrung; postum an Eduard Chaloupka (einziger Bajuvare)"]
  ],
  cloze: [
    "Bajuvaria wurde am {{19. Juni 1920}} gegründet.",
    "Gründungssenior war Eduard Chaloupka v. {{Isegrim}}.",
    "Die Prunkfahne wurde 1924 von Bundeskanzler {{Seipel}} geweiht.",
    "Der ÖCV entstand am 10. Juli {{1933}} unter dem Vorort {{Norica}}."
  ],
  order: [
    { t: "Chronik Bajuvaria", items: ["Gründung Frankonia (1919)", "Gründung Bajuvaria (1920)", "Erste Bude im Pfarrhof St. Rochus (1921)", "Aufzugsrecht verliehen (1923)", "Prunkfahne geweiht (1924)", "Freie Vereinigung im CV (1929)", "Vollmitglied im CV (1932)", "Auflösung durch die Gestapo (1938)", "35. Stiftungsfest mit Raab (1955)", "Erster Vorort (1968/69)", "Weihe Bude Naglergasse (1982)"] },
    { t: "Chronik CV/ÖCV", items: ["Aenania München (1851)", "Cartellverhältnis Aenania–Winfridia (1856)", "Erste Cartellversammlung (1863)", "Austria Innsbruck (1864)", "Austria Wien (1876)", "Norica (1883)", "Austria & Töchter treten dem CV bei (1906)", "Gründung des ÖCV (1933)", "Gründung des EKV (1975)"] }
  ]
}
];
