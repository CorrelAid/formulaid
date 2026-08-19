# Civic Data Lab Umfragenwerkstatt — llm.txt

> This file contains the full text content of the "Civic Data Lab Umfragenwerkstatt",
> a guide for survey methodology and tools developed by CorrelAid's Civic Data Labs.
> It covers the complete survey lifecycle: conception, questionnaire design, data collection,
> data preparation & analysis, and translating results into action.
> The content is primarily in German.
> Examples include XLSForm tables only (DDI Codebook excluded).
>
> Source: https://umfragen.civic-data.de/

## Table of Contents


1. Konzeption
   - Einführung
   - Studiendesign & Umfragetypen
   - Forschungsfragen formulieren
   - Messtheorie & Konstrukte
   - Stichprobenauswahl
   - Datenschutz

2. Fragebogendesign
   - Einführung
   - Operationalisierung
   - Fragebogenaufbau
   - Fragen formulieren
   - Antworttypen
   - Pretesting
   - XLSForm Standard

---


Bevor der erste Fragebogen entworfen wird, braucht es eine solide Grundlage: Was genau wollt ihr herausfinden, und warum? Die Konzeptionsphase ist der wichtigste und am häufigsten übersprungene Schritt im Umfrageprozess.

In dieser Phase klärt ihr:

- **Welches Problem** ihr lösen oder welche Entscheidung ihr mit Daten unterstützen wollt
- **Welche Forschungsfragen** sich daraus ableiten lassen
- **Welches Studiendesign** zu eurem Vorhaben passt
- **Welche Konzepte und Konstrukte** ihr messen müsst
- **Wen ihr befragen** wollt und könnt
- **Welche datenschutzrechtlichen Rahmenbedingungen** gelten

Der häufigste Fehler in der Praxis: Man beginnt direkt mit dem Fragebogen, ohne sich vorher klar zu machen, welche Informationen man eigentlich braucht. Das führt zu Fragen, die zwar interessant klingen, aber am Ende keine verwertbaren Ergebnisse liefern. Investiert lieber etwas mehr Zeit in die Konzeption. Das spart euch später viel Arbeit bei der Auswertung und Interpretation.

---

Bevor ihr mit dem Fragebogen anfangt, solltet ihr euch Gedanken über das **Studiendesign** machen: Welche Art von Umfrage passt zu eurer Fragestellung? Wie oft und wann wollt ihr befragen? Und was könnt ihr aus den Ergebnissen überhaupt ableiten?

Das Studiendesign bestimmt, welche Schlüsse ihr am Ende ziehen könnt, und welche nicht. Ein Fragebogen kann noch so gut formuliert sein: Wenn das Design nicht zur Forschungsfrage passt, sind die Ergebnisse begrenzt aussagekräftig.

## Umfragetypen nach Zweck

### Bedarfserhebung

Ihr wollt herausfinden, **was eure Zielgruppe braucht**, bevor ihr ein Angebot entwickelt oder anpasst. Typische Forschungsfragen: *Welche Themen sind relevant? Welche Formate werden bevorzugt? Wo gibt es ungedeckte Bedarfe?*

> **Praxisbeispiel:**
> Ein Stadtteilzentrum plant ein neues Bildungsangebot für Seniorinnen und Senioren. Bevor Kurse konzipiert werden, wird eine Bedarfserhebung durchgeführt: Welche Themen interessieren? Welche Zeiten passen? Welche Barrieren gibt es (Mobilität, digitale Kompetenz)? Die Ergebnisse fließen direkt in die Angebotsplanung ein.

### Wirkungsmessung

Ihr wollt verstehen, **ob und wie euer Angebot etwas verändert hat**. Das ist methodisch am anspruchsvollsten, weil ihr im Grunde Ursache und Wirkung nachweisen müsst.

Eine einmalige Befragung kann Wirkungen nicht kausal belegen, aber sie kann Hinweise liefern, z.B. durch subjektive Einschätzungen der Teilnehmenden (*„Durch den Kurs fühle ich mich sicherer im Umgang mit …"*) oder durch Vorher-Nachher-Vergleiche.

## Studiendesigns

### Querschnittsbefragung

Die **Querschnittsbefragung** ist der einfachste und häufigste Fall: Ihr befragt eine Gruppe von Personen **einmalig zu einem Zeitpunkt**. Die meisten Zufriedenheitsbefragungen und Bedarfserhebungen sind Querschnittsbefragungen.

**Vorteil**: Einfach durchzuführen, geringe Kosten und Aufwand.

**Einschränkung**: Ihr könnt Zusammenhänge beschreiben (*Personen, die häufiger teilnehmen, sind zufriedener*), aber keine Kausalität belegen (*Häufige Teilnahme führt zu mehr Zufriedenheit*, oder kommen zufriedene Personen einfach häufiger?).

### Längsschnittbefragung

Bei einer **Längsschnittbefragung** befragt ihr dieselben Personen **zu mehreren Zeitpunkten**, z.B. vor und nach einer Maßnahme. Das erlaubt Vorher-Nachher-Vergleiche und gibt Hinweise auf Veränderungen.

> **Praxisbeispiel:**
> Ein Mentoring-Programm befragt die Mentees zu Beginn und nach Abschluss des Programms. Die erste Befragung erfasst Ausgangslage und Erwartungen, die zweite den wahrgenommenen Lernfortschritt und die Zufriedenheit. Durch den Vergleich lässt sich besser einschätzen, ob sich die Selbsteinschätzung der Mentees verändert hat.

**Vorteil**: Veränderungen werden sichtbar, Aussagen über Entwicklung sind möglich.

**Einschränkung**: Höherer Aufwand, Teilnehmende fallen zwischen den Befragungen weg (Panel-Mortalität), und ihr braucht eine Möglichkeit, die Antworten derselben Person zu verknüpfen, was datenschutzrechtlich sorgfältig gelöst werden muss (→ [Datenschutz](/datenschutz)).

### Wiederholte Querschnittsbefragung

Eine Mischform: Ihr führt dieselbe Befragung **regelmäßig durch** (z.B. jährlich), befragt aber nicht zwingend dieselben Personen. Das erlaubt Vergleiche über die Zeit auf Gruppenebene, aber keine individuellen Verläufe.

**Typischer Einsatz**: Jährliche Mitgliederbefragungen, regelmäßige Feedbackrunden nach Veranstaltungsreihen.

## Studiendesign und Forschungsfragen zusammenbringen

Euer Studiendesign sollte sich direkt aus euren [Forschungsfragen](/forschungsfragen) ableiten:

| Forschungsfrage zielt auf … | Geeignetes Design |
|-----------------------------|-------------------|
| Aktuelle Meinungen, Bedarfe, Bewertungen | Querschnittsbefragung |
| Veränderungen durch eine Maßnahme | Längsschnittbefragung (Vorher-Nachher) |
| Trends über die Zeit | Wiederholte Querschnittsbefragung |
| Kausale Wirkungen | Experimentelles Design (für NPOs selten praktikabel) |

Seid realistisch: Wählt ein Design, das ihr mit euren Ressourcen auch umsetzen könnt. Eine sorgfältig durchgeführte Querschnittsbefragung ist besser als eine ambitionierte Längsschnittstudie, die an der Umsetzung scheitert.

**Zum Abschluss**: Studiendesign ist eine Dimension der [Belastbarkeit](/handeln-einleitung#wie-belastbar-sind-eure-daten) eurer Erkenntnisse. Je nach Design könnt ihr unterschiedliche Arten von Aussagen treffen (vgl. auch World Health Organization (2021)):

| Design | Mögliche Aussage |
|---|---|
| Querschnittsbefragung | *„X Prozent der Befragten gaben an, dass …"* |
| Längsschnittbefragung | *„Im Vergleich zu vorher hat sich … verändert"* |
| Experimentelles Design | *„Das Programm hat bewirkt, dass …"* |

Eine Querschnittsbefragung kann keine Kausalität belegen, aber sie kann valide beschreiben, was eure Zielgruppe denkt, braucht oder bewertet. Problematisch wird es, wenn Ergebnisse mit mehr Gewissheit kommuniziert werden, als das Design erlaubt: *„Unser Programm hat die Zufriedenheit erhöht"* lässt sich aus einer einmaligen Befragung nicht ableiten; *„Die Teilnehmenden schätzen ihre Zufriedenheit nach dem Programm als hoch ein"* schon.

---

Jede Umfrage beginnt mit einer Frage, aber nicht mit einer Fragebogenfrage, sondern mit einer **Forschungsfrage**. Die Forschungsfrage beschreibt, was ihr mit eurer Umfrage herausfinden wollt. Sie ist der rote Faden, an dem sich alles Weitere orientiert: das Studiendesign, die Operationalisierung, die Frageformulierung und am Ende auch die Auswertung.

## Warum Forschungsfragen so wichtig sind

Ohne klare Forschungsfragen passiert in der Praxis häufig Folgendes: Man sammelt Fragen, die „irgendwie interessant" klingen, baut daraus einen Fragebogen, und stellt bei der Auswertung fest, dass die Ergebnisse sich nicht zu einem klaren Bild zusammenfügen. Der Grund: Es fehlt die Klammer, die die einzelnen Fragen zusammenhält.

Forschungsfragen helfen euch:

- **Fokus zu setzen**: Nicht alles abfragen, was man fragen *könnte*, sondern das, was man wissen *muss*
- **Relevanz zu prüfen**: Für jede Fragebogenfrage könnt ihr prüfen, ob sie zur Beantwortung einer Forschungsfrage beiträgt
- **Auswertung vorzubereiten**: Gute Forschungsfragen legen schon fest, welche Art von Analyse ihr braucht

## Vom Informationsbedarf zur Forschungsfrage

Der Ausgangspunkt ist meist kein wissenschaftliches Interesse, sondern ein ganz praktischer **Informationsbedarf**: Eure Organisation möchte etwas wissen, um eine Entscheidung zu treffen oder ein Angebot zu verbessern. Dieser Informationsbedarf muss in eine oder mehrere konkrete, beantwortbare Fragen übersetzt werden.

### Schritt 1: Informationsbedarf klären

Fragt euch: **Welche Entscheidung soll auf Basis der Umfrageergebnisse getroffen werden?** Oder: **Welches Problem wollen wir besser verstehen?**

> **Praxisbeispiel:**
> Eine Nachbarschaftsinitiative möchte ihr Veranstaltungsprogramm verbessern. Der Informationsbedarf ist zunächst vage: *„Wir wollen wissen, wie unser Programm ankommt."* Das ist ein guter Startpunkt, aber noch keine Forschungsfrage. Es ist unklar, was genau „ankommen" bedeutet und was man mit dem Ergebnis anfangen würde.
> 
> Durch Nachfragen wird der Bedarf konkreter: Die Initiative überlegt, ob sie bestimmte Formate (z.B. Workshops vs. offene Treffen) stärker ausbauen soll. Damit verschiebt sich der Fokus: Es geht nicht um allgemeine Zufriedenheit, sondern um die **Bewertung und Nutzung einzelner Formate**.

### Schritt 2: Forschungsfragen formulieren

Eine gute Forschungsfrage ist:

- **Konkret**: Sie benennt klar, was untersucht werden soll
- **Beantwortbar**: Man kann sich vorstellen, welche Daten man bräuchte, um sie zu beantworten
- **Abgegrenzt**: Sie ist nicht so breit, dass man einen ganzen Forschungsbericht bräuchte
- **Relevant**: Die Antwort hat praktische Konsequenzen für eure Organisation

### Schritt 3: Forschungsfragen priorisieren

In der Regel habt ihr mehr Fragen als Platz im Fragebogen. Priorisiert nach:

1. **Entscheidungsrelevanz**: Welche Fragen haben direkte Konsequenzen für eure nächsten Schritte?
2. **Machbarkeit**: Lässt sich die Frage mit einer Umfrage überhaupt beantworten?
3. **Bestehendes Wissen**: Wissen wir die Antwort vielleicht schon aus anderen Quellen?

## Typische Fehler

### Zu breit formuliert

*„Wie zufrieden sind die Teilnehmenden?"* Zufriedenheit womit? Mit dem Inhalt, der Organisation, der Atmosphäre, den Öffnungszeiten? Eine zu breite Frage führt entweder zu einem überladenen Fragebogen oder zu einer einzelnen Frage, deren Antwort nicht interpretierbar ist.

**Besser**: *„Wie bewerten die Teilnehmenden die inhaltliche Qualität der Workshops?"* oder *„Welche organisatorischen Aspekte des Angebots werden als verbesserungswürdig wahrgenommen?"*

### Suggestiv oder wertend

*„Sind die Teilnehmenden mit unserem hervorragenden Angebot zufrieden?"* Die Forschungsfrage selbst sollte neutral sein. Wertungen gehören weder in die Forschungsfrage noch in die Fragebogenfrage.

### Nicht mit einer Umfrage beantwortbar

*„Wirkt unser Programm langfristig auf die Berufschancen der Teilnehmenden?"* Kausale Langzeitwirkungen lassen sich mit einer einmaligen Querschnittsbefragung nicht belegen. Die Frage ist spannend, aber das Instrument passt nicht. Hier müsste man entweder die Frage anpassen (z.B. auf die subjektive Einschätzung der Teilnehmenden eingrenzen) oder ein anderes Studiendesign wählen.

### Zu viele Forschungsfragen

Jede Forschungsfrage erzeugt mehrere Fragebogenfragen. Wenn ihr mit zehn Forschungsfragen startet, wird euer Fragebogen schnell so lang, dass die Abbruchquote steigt und die Datenqualität sinkt. Konzentriert euch auf drei bis fünf zentrale Forschungsfragen.

## Von der Forschungsfrage zum Fragebogen

Die Forschungsfragen bilden die Brücke zwischen eurem Informationsbedarf und dem Fragebogen. Für jede Forschungsfrage müsst ihr im nächsten Schritt klären:

- Welche **Konzepte und Konstrukte** stecken dahinter? → [Messtheorie & Konstrukte](/konzepte-konstrukte)
- Wie lassen sich diese Konstrukte in **messbare Items** übersetzen? → [Operationalisierung](/operationalisierung)
- Welche **Antwortformate** eignen sich? → [Antworttypen](/fragetypen)

Wenn ihr bei der Operationalisierung merkt, dass eine Forschungsfrage nicht sinnvoll in Fragebogenfragen übersetzbar ist, geht zurück und überarbeitet die Forschungsfrage. Das ist kein Scheitern, sondern Teil des Prozesses.

---

Viele Dinge, die euch in einer Umfrage interessieren, lassen sich nicht direkt beobachten: Zufriedenheit, Motivation, Kompetenz, Zugehörigkeitsgefühl. In der Sozialforschung spricht man hier auch von **latenten Variablen**, also Größen, die nicht direkt messbar sind, sondern nur indirekt über beobachtbare Hinweise (Indikatoren) erschlossen werden können. Im Gegensatz dazu stehen **manifeste Variablen** wie Alter, Postleitzahl oder Anzahl der Besuche, die direkt abgefragt werden können.

Um latente Variablen per Fragebogen zu erfassen, braucht ihr ein Grundverständnis davon, wie Messung in Umfragen funktioniert.

## Konstrukte, Dimensionen und Indikatoren

### Konstrukt

Ein **Konstrukt** ist ein theoretisch definiertes, nicht direkt beobachtbares Phänomen, das ihr messen wollt. Es geht über eine vage Alltagsidee hinaus: Wenn ihr „Zufriedenheit" genauer definiert, z.B. als *die subjektive Bewertung der Passung zwischen Erwartungen und Erfahrungen*, habt ihr ein Konstrukt. Es beschreibt präzise, was ihr messen wollt und grenzt es von verwandten Phänomenen ab.

### Dimension

Die meisten Konstrukte sind mehrdimensional, sie bestehen aus mehreren Teilaspekten. Diese **Dimensionen** zu identifizieren ist ein wichtiger Zwischenschritt, weil er bestimmt, welche Bereiche euer Fragebogen abdecken muss. Das Konstrukt „Zufriedenheit mit einem Workshop" könnte z.B. die Dimensionen *inhaltliche Qualität*, *Organisation/Ablauf*, *Atmosphäre* und *Praxisrelevanz* umfassen.

### Indikator

Ein **Indikator** ist ein beobachtbarer Hinweis auf eine Dimension eines Konstrukts, also etwas, das ihr tatsächlich abfragen könnt. Für die Dimension „inhaltliche Qualität" könnte ein Indikator sein: *Zustimmung zur Aussage „Die behandelten Themen waren für meine Arbeit relevant."*

Die Kette sieht also so aus:

**Konstrukt** (präzise Definition) → **Dimensionen** (Teilaspekte) → **Indikatoren** (messbare Fragen)

> **Praxisbeispiel:**
> Eine Umweltschutzorganisation möchte das „Engagement" ihrer Freiwilligen messen. Aber was ist Engagement? Ist es die Häufigkeit der Teilnahme? Die emotionale Verbundenheit? Die Bereitschaft, neue Aufgaben zu übernehmen?
> 
> Wenn das nicht vorab geklärt wird, entsteht ein Fragebogen mit Fragen, die verschiedene Aspekte von „Engagement" vermischen, und am Ende weiß man nicht, was die Ergebnisse aussagen.
> 
> Eine saubere Vorgehensweise: Das Konstrukt „Engagement" wird in zwei Dimensionen aufgeteilt: **Verhaltensengagement** (beobachtbare Aktivitäten wie Häufigkeit der Teilnahme, übernommene Aufgaben) und **affektives Engagement** (emotionale Bindung, Identifikation mit der Organisation). Für jede Dimension werden dann eigene Indikatoren entwickelt. So können die Ergebnisse getrennt ausgewertet werden. Vielleicht sind die Freiwilligen emotional stark verbunden, aber können zeitlich weniger einbringen.

## Warum das wichtig ist

### Klarheit bei der Auswertung

Wenn ihr wisst, welches Konstrukt eine Frage misst, könnt ihr die Ergebnisse sinnvoll interpretieren. Ohne diese Zuordnung bleibt unklar, was eine Zahl eigentlich bedeutet.

### Vermeidung von Fehlinterpretation

Wenn eine einzelne Frage ein vielschichtiges Konstrukt abbilden soll, sind die Ergebnisse mehrdeutig. Eine hohe Zustimmung zur Aussage *„Ich bin zufrieden"* kann vieles bedeuten, und ohne Konstruktdefinition wisst ihr nicht, was genau.

### Grundlage für die Operationalisierung

Die Konstruktdefinition ist die direkte Vorstufe zur [Operationalisierung](/operationalisierung): Erst wenn ihr wisst, was ihr messen wollt (Konstrukt), könnt ihr entscheiden, wie ihr es messen wollt (Items).

## Gütekriterien: Validität und Reliabilität

Validität und Reliabilität sind eine Dimension der [**Belastbarkeit**](/handeln-einleitung#wie-belastbar-sind-eure-daten) eurer Erkenntnisse. Zwei zentrale Fragen solltet ihr im Hinterkopf behalten:

### Validität: Messen wir das Richtige?

Eine Messung ist **valide**, wenn sie tatsächlich das misst, was sie messen soll. Wenn ihr „Zufriedenheit mit dem Angebot" messen wollt, aber eure Fragen eigentlich die allgemeine Stimmung am Tag der Befragung erfassen, dann ist die Messung nicht valide.

Für die Praxis heißt das: Überlegt bei jeder Frage, ob die Antworten wirklich Rückschlüsse auf euer Konstrukt zulassen, oder ob sie auch durch andere Faktoren erklärt werden können.

### Reliabilität: Messen wir zuverlässig?

Eine Messung ist **reliabel**, wenn sie bei Wiederholung unter gleichen Bedingungen ähnliche Ergebnisse liefert. Unreliabel wäre z.B. eine Frage, die so unklar formuliert ist, dass dieselbe Person sie je nach Tagesform unterschiedlich versteht.

In der NPO-Praxis verbessert ihr die Reliabilität vor allem durch klare, eindeutige Formulierungen und durch [Pretesting](/pretesting) des Fragebogens.

## Von der Theorie zur Praxis

Die Messtheorie klingt vielleicht abstrakt, aber die praktische Konsequenz ist einfach: **Definiert vor dem Fragebogendesign, was genau ihr messen wollt.** Schreibt für jedes Konstrukt eine kurze Definition auf. Ein bis zwei Sätze reichen. Das hilft euch:

1. Bei der [Operationalisierung](/operationalisierung) die richtigen Indikatoren zu finden
2. Bei der Auswertung zu wissen, was die Zahlen bedeuten
3. Bei der Kommunikation der Ergebnisse präzise zu sein

Dieser Schritt wird oft übersprungen, weil er „theoretisch" wirkt, aber er spart euch erheblich Arbeit in den späteren Phasen.

---

Bevor man eine Umfrage startet, lohnt es sich kurz zu reflektieren: "Wen erreichen wir eigentlich mit unserer Umfrage und insbesondere wen erreichen wir nicht?" Die Antwort auf diese Frage beeinflusst, welche Schlüsse man am Ende ziehen kann.

Stellt euch vor, eine offene Jugend-Werkstatt möchte wissen, wie ihr Angebot bei den Teilnehmenden ankommt. Sie erstellt einen Fragebogen mit Fragen zur Zufriedenheit, zu gelernten Fähigkeiten und zur beruflichen Orientierung. Aber wer füllt den Fragebogen tatsächlich aus? Und was bedeutet das für die Ergebnisse? Genau darum geht es in diesem Text.

Zwei zentrale Begriffe dafür:

- **Grundgesamtheit**: alle Personen, über die ihr am Ende Aussagen treffen wollt. In der NPO-Praxis ist das meist eure Zielgruppe.
- **Repräsentativität**: Eine Stichprobe ist repräsentativ, wenn sie die Grundgesamtheit in den relevanten Merkmalen (z.B. Alter, Geschlecht, Mitgliedsdauer) widerspiegelt. Nur dann lassen sich Aussagen aus der Stichprobe auf die Grundgesamtheit übertragen. In der Praxis ist vollständige Repräsentativität selten erreichbar, aber je näher ihr ihr kommt, desto belastbarer sind eure Ergebnisse.

## Zufallsstichprobe vs. Gelegenheitsstichprobe

In der Theorie wäre das Ideal eine **Zufallsstichprobe**: Jede Person aus der Zielgruppe hat die gleiche Chance, befragt zu werden. Das ist der Goldstandard, weil die Ergebnisse dann exemplarisch die gesamte Zielgruppe repräsentieren. In der Praxis ist das für NPOs aber selten machbar — es gibt oft keine vollständige Liste aller Personen in der Zielgruppe, und selbst wenn, lassen sich nicht alle erreichen.

Was stattdessen meistens passiert, ist eine **Gelegenheitsstichprobe** (englisch: Convenience Sample): Befragt werden die Personen, die gut erreichbar sind und mitmachen wollen. Bei unserer Jugend-Werkstatt wären das vermutlich Teilnehmende, die aktuell regelmäßig in die Werkstatt kommen und daher leicht zu erreichen sind. Das ist völlig normal und oft der einzig gangbare Weg — aber es ist wichtig, sich der Konsequenzen bewusst zu sein.

## Typische Verzerrungen

Wenn unsere Stichprobe nicht zufällig ist, können verschiedene Verzerrungen (englisch: Biases) auftreten. Hier die wichtigsten:

### Abdeckungsproblem (Coverage Bias)

Nicht alle Personen der Zielgruppe haben überhaupt die Möglichkeit, an der Umfrage teilzunehmen. In unserem Beispiel: Wer die Werkstatt nach kurzer Zeit wieder verlassen hat, bekommt die Umfrage wahrscheinlich gar nicht zu sehen — dabei wäre gerade deren Feedback besonders wertvoll. In Fall einer anderen NPO könnte eine reine Online-Umfrage die Teile der Zielgruppe ausschließen, die keinen Internet Zugang haben oder weniger fit mit Computern sind.

### Antwortverzerrung (Response Bias)

Selbst unter den Personen, die die Umfrage erhalten, antworten nicht alle — und die, die antworten, sind oft nicht repräsentativ für die Gesamtgruppe. Wer sich in der Werkstatt wohlfühlt, kommt vermutlich häufiger und nimmt sich evtl. eher die Zeit für den Fragebogen. Jugendliche, die unzufrieden sind oder nur selten vorbeischauen, haben vielleicht weniger Motivation den Fragebogen auszufüllen. Es könnte also sein, dass die Zufriedenheit durch diese Art der Antwortverzerrung überschätzt wird.

### Soziale Erwünschtheit (Social Desirability Bias)

Ein weiterer Effekt, der die Frage nach der Zufriedenheit beeinflussen kann, ist die Tendenz sozial erwünschte Antwortoptionen zu präferieren.  Menschen neigen dazu, so zu antworten, wie sie glauben, dass es erwartet wird. Insbesondere wenn die Teilnehmenden wissen, dass die Werkstatt selbst die Umfrage durchführt, fällt es schwerer, bei einer Frage wie "Ich fühle mich wohl und akzeptiert" ehrlich "Stimme nicht zu" anzukreuzen. Auch bei sensiblen Themen wie der beruflichen Situation kann dieser Effekt auftreten.

### Stichprobengröße

Je kleiner die Stichprobe, desto größer die Unsicherheit. Mit 30 Antworten lassen sich keine feinen Unterschiede zwischen Untergruppen belegen, auch wenn die Prozentzahlen verlockend aussehen.

**Prozentzahlen vs. absolute Zahlen**: Bei kleinen Stichproben sind Prozentangaben irreführend. *„100% der Befragten waren sehr zufrieden"* klingt beeindruckend, bedeutet aber wenig, wenn nur drei Personen geantwortet haben. Faustregel: Bei n < 30 (oder bei Untergruppen mit n < 30) immer auch absolute Zahlen nennen, z.B. *„3 von 3 Befragten waren sehr zufrieden"*. Das ist ehrlicher und lässt Lesende selbst einschätzen, wie viel Gewicht die Aussage hat.

Auch bei größeren Stichproben gilt: Untergruppenvergleiche (*„Frauen sind zufriedener als Männer"*) brauchen pro Gruppe ausreichend Antworten. Wenn nur 5 Männer geantwortet haben, sagt der Unterschied wenig aus, egal wie groß die Gesamtstichprobe ist.

## Was bedeutet das für die Aussagekraft der Umfrage?

Repräsentativität und Stichprobengröße sind eine Dimension der [Belastbarkeit](/handeln-einleitung#wie-belastbar-sind-eure-daten) eurer Erkenntnisse: Sie bestimmen, für wen die Ergebnisse gelten und wie sicher Aussagen sein können.

Durch diese Verzerrungen gelten die Ergebnisse der Umfrage streng genommen nur für die Personen, die tatsächlich geantwortet haben. Trotzdem kann man versuchen Schlüsse auf die gesamte Zielgruppe zu schließen. Es ist dabei allerdings wichtig, die Einschränkungen bei der Stichprobenzusammensetzung ehrlich zu kommunizieren. Auch statistische Auswertungen, wie sie im Abschnitt zur [schließenden Statistik](/schliessende-statistik) beschrieben werden, gehen von einer Zufallsstichprobe aus. Wenn diese nicht gegeben ist, solltet ihr statistische Schlüsse mit besonderer Vorsicht interpretieren.

Diese Einschränkungen treten in der Umfragearbeit bei NPOs sehr häufig auf. Es ist wichtig sich derer bewusst zu sein und zu verstehen wie sie die Ergebnisse beeinflussen können. Trotzdem ist es sehr viel besser eine Umfrage mit Einschränkungen durchzuführen als gar keine und es gibt auch Schritte mit denen ihr die Aussagekraft eurer Umfrage erhöhen könnt.

## Was könnt ihr tun?

### Transparent berichten

Das Wichtigste: Seid ehrlich darüber, wie eure Stichprobe zustande kam. Ein Satz wie *"Von ca. 80 aktiven Teilnehmenden haben 30 die Umfrage ausgefüllt. Ehemalige Teilnehmende wurden nicht erreicht."* stärkt eure Glaubwürdigkeit und zeigt, dass ihr euch mit den Konsequenzen einer Gelegenheitsstichprobe auseinandergesetzt habt. Wenn ihr noch sagen könnt welche Maßnahmen ihr zusätzlich ergriffen habt um die Repräsentativität eurer Stichprobe zu erhöhen, zeichnet euch das noch zusätzlich aus.

### Rücklaufquote erhöhen

Je mehr Personen aus eurer Zielgruppe antworten, desto aussagekräftiger werden die Ergebnisse. Erinnerungen versenden, den Fragebogen kurz halten und einen einfachen Zugang (z.B. QR-Code vor Ort) bieten — das alles hilft.

### Demografische Merkmale erfassen

Wenn ihr grundlegende Merkmale wie Alter, Geschlecht oder Länge der Mitgliedschaft abfragt (aber siehe [Datenschutz](/datenschutz)), könnt ihr im Nachhinein einschätzen, ob bestimmte Gruppen in euren Antworten über- oder unterrepräsentiert sind. Wenn ihr z.B. wisst, dass eure Teilnehmenden zu 60% weiblich sind, aber 80% der Umfrageantworten von weiblichen Teilnehmenden kommen, ist das ein Hinweis auf eine Verzerrung. Es gibt sogar statistische Verfahren, die solche Unterschiede nachträglich korrigieren können.

---

Bei Online-Umfragen im zivilgesellschaftlichen Bereich, z.B. in der Wirkungsmessung, werden meist personenbezogene Daten mit erhoben. Sobald ein Interesse an demografischen Daten besteht oder offene Texteingabe dabei ist, muss damit gerechnet werden, dass bei Kombination von verschiedenen Antworten oder durch eingegebene persönliche Details auf die Identität von Einzelpersonen geschlossen werden kann, auch wenn Teilnehmende keine Namen oder Kontaktdaten angeben. In diesen Fällen greift die Datenschutzgrundverordnung (DSGVO; bzw. entsprechende Regelungen im kirchlichen Bereich wie das KDG und das DSG-EKD) und die Verarbeitung der Daten im Rahmen der Umfrage braucht eine Rechtsgrundlage. Das ist meist eine Einwilligung der Teilnehmenden.

Wir können an dieser Stelle natürlich keine umfassende Rechtsberatung geben, sondern stellen Erfahrungswerte und Best-Practices zusammen. Sprecht potenzielle Verarbeitung personenbezogener Daten im Rahmen von Online-Umfragen bitte immer mit den Datenschutzbeauftragten Eurer Organisation ab und plant dafür Zeit ein. 

Dennoch stellen wir Euch hier verbreitete Arten von Vorkommen personenbezogener Fragen bei Online-Umfragen zusammen, führen die wichtigsten Maßnahmen, die ihr ergreifen könnt und weisen euch auf häufige Fehler bei der Konzeption hin.

Wenn ihr euch umfassender mit dem Thema befassen wollt, empfehlen wir auch die [Bildungsmaterialien aus dem passenden Bereich in der CDL Academy](https://civic-data.de/datenlebenszyklus/datenschutz-und-datenethik/#inhaltsstart).

## Typen von Online-Umfragen in Bezug auf ihren Umgang mit Personenbezug
Diese Typen helfen, den Personenbezug in Sinne der DSGVO etwas besser zu verstehen. Sie sind jedoch nicht trennscharf, d.h. in der Realität können Umfragen Eigenschaften aus mehreren Typbeschreibungen haben. Wichtig ist, dass die DSGVO immer dann greift, wenn Daten nicht vollständig anonym sind.
### Offen personenbezogene Umfrage (Klardatenverarbeitung)
Die Umfrage wird bewusst mit Namen, E-Mail-Adresse, Personalnummer oder anderen direkt identifizierenden Angaben durchgeführt. Das kann passend sein, wenn innerhalb einer Organisation Teilnahmepflicht besteht, Rückfragen gestellt, individuelle Auswertungen über längere Zeiträume angefertigt oder Teilnahmebescheinigungen ausgegeben werden sollen. Dann braucht es aber eine klare Rechtsgrundlage, transparente Information, Zweckbindung, Datensparsamkeit und angemessene Schutzmaßnahmen. 

### Indirekt identifizierbare Umfrage
Zwar werden keine direkten Identifikationsmerkmale wie Name oder E-Mail-Adresse erhoben. Trotzdem kann unter Umständen ein Rückschluss auf einzelne Personen möglich sein, zum Beispiel durch die Kombination mehrerer Angaben wie Alter, Geschlecht und Wohnort oder durch Inhalte in offenen Textfeldern. Besonders bei Umfragen zur Evaluation unter persönlich bekannten Teilnehmenden mit eher kleineren Teilnehmendengruppen kommt dies vor. 
Die Umfrage ist deshalb nicht als anonym anzusehen und die erhobenen Daten sind weiterhin als personenbezogene Daten zu behandeln, weil eine Person direkt oder indirekt identifizierbar sein kann. Für die Verarbeitung gelten daher die Anforderungen der DSGVO.

### Nur aggregierte Veröffentlichung bei personenbezogener Rohdatenverarbeitung
Die Rohdaten können intern personenbezogen sein, nach außen werden aber nur zusammengefasste Ergebnisse veröffentlicht. Das ersetzt keine datenschutzkonforme Verarbeitung der Rohdaten, senkt aber das Risiko für die betroffenen Personen bei der Weitergabe oder Publikation. 

### Pseudonymisierte Umfrage
Bei einer pseudonymisierten Umfrage werden die Antworten nicht direkt mit Namen oder anderen unmittelbar identifizierenden Angaben gespeichert. Stattdessen wird ein Code oder eine Kennnummer verwendet. Die Angaben können also nicht ohne Weiteres einer bestimmten Person zugeordnet werden. Eine Zuordnung wäre nur mit zusätzlichen Informationen möglich, die getrennt aufbewahrt und besonders geschützt werden müssen. Auch pseudonymisierte Daten gelten weiterhin als personenbezogene Daten. Deshalb bleibt die DSGVO anwendbar. Genau wie die aggregierte Veröffentlichung ist die pseudonymisierte Speicherung eine Schutzmaßnahme, weil sie das Risiko für die betroffenen Personen verringert.

### Getrennte Erhebung ohne Verknüpfung
Es gibt Fälle, in denen personenbezogene Daten entstehen, aber nicht mit den Antworten verknüpft sein müssen und daher getrennt verarbeitet werden können, z.B. wenn eine Verlosung unter den Teilnehmenden stattfindet oder über das Versenden personalisierter Links eine mehrfache Umfrageteilnahme verhindert werden soll. Die eigentlichen Antworten werden in einem Formular erhoben, Kontaktdaten in einem zweiten, getrennten Formular. Wenn es keine Verknüpfung zwischen beiden Datensätzen gibt, können die Antworten faktisch anonym sein, obwohl daneben noch personenbezogene Kontaktdaten verarbeitet werden. Datenschutzrechtlich sind dann die Kontaktliste und die Antworten getrennt zu bewerten und für die personenbezogenen Anteile sind Rechtsgrundlage und Information erforderlich.

### Zunächst personenbezogen, später anonymisiert
Die Umfrage startet mit Personenbezug. Nach Abschluss werden Identifikatoren gelöscht und nur noch anonymisierte oder rein aggregierte Ergebnisse weiterverwendet. Das ist oft ein praktikabler Mittelweg, wenn echte Anonymität während der Erhebung noch nicht möglich ist. Häufige Methoden sind die Entfernung der Identifikatoren und Re-Identifikatoren, Randomisierung und Generalisierung. Auch die o.g. Aggregation kann ein Weg sein. 
In der praktischen Umsetzung führt dies insbesondere bei Freitextfeldern dennoch oft zu viel Arbeitsaufwand. In zivilgesellschaftlichen Arbeitsfeldern, in denen nur ab und zu eine Umfrage durchgeführt ist besteht oft kein Zugang zu DSGVO-konformen Tools, die dies übernehmen können. Eine Rechtsgrundlage und transparente Information für die Erhebung und die Verarbeitungsschritte bis zur Anonymisierung ist natürlich dennoch erforderlich.

### Vollständig anonyme Umfrage
Es werden von Anfang an keine Angaben erhoben, mit denen einzelne Personen identifiziert werden können. Das ist die datenschutzärmste Variante, aber nur dann tragfähig, wenn eine Re-Identifizierung nicht möglich ist. Bei Online-Umfragen ist wichtig zu beachten, dass auch IP-Adressen, Cookie-IDs und ähnliches als personenbezogene Daten gelten. Einige Tools ermöglichen serverseitige Nicht-Speicherung oder sofortige Kürzung von IP-Adressen. Hierbei ist es wichtig, die Einstellungen der geplanten Tools genau unter die Lupe zu nehmen.

Die Grundsätze des Datenschutzes gelten für anonyme Daten nicht, d.h. anonyme Daten dürfen jederzeit beispielsweise für statistische oder für Forschungszwecke auch als Rohdaten weitergegeben werden. Auch eine Veröffentlichung als Open Data wäre ohne weitere Einverständniserklärungen von Teilnehmenden möglich. Beispiele für anonyme Umfragen sind einfache offene Online-Umfragen auf großen Veranstaltungen, bei denen ohne Speichern von IP-Adressen oder anderem nur wenig gefragt wird, z.B. „Wie zufrieden bist du heute mit der Veranstaltung“ als Ranking auf einer Skala. Ähnlich funktionieren auch Terminals mit Smiley-Buttons am Ausgang von Gebäuden oder in öffentlichen Toiletten.

## Maßnahmen
Es wird deutlich, dass in den meisten Fällen zumindest für einen Teil der Erhebung Personenbezug schwer auszuschließen ist. Dann finden die Regelungen der DSGVO Anwendung. Das bedeutet, dass zum einen passende Schutzmaßnahmen für die Daten zu ergreifen sind, damit sie nur gemäß dem vorab kommunizierten Zweck verarbeitet werden. Zum anderen ist eine Rechtsgrundlage für die Verarbeitung erforderlich, verbunden mit transparenten Informationen für die Teilnehmenden. Bei Online-Umfragen wird das meistens eine Einwilligungserklärung der Teilnehmenden sein, ggf. auch durch ihre Teilnahme an der Umfrage.

### Datenschutzinformation
Alle Teilnehmenden an der Umfrage sollten nach [Art.13 DSGVO](https://dsgvo-gesetz.de/art-13-dsgvo/) vorab über ihre Rechte sowie über den Umfang und Zweck der Umfrage aufgeklärt werden – dafür gibt es eine Datenschutzerklärung oder auch Datenschutzinformation mit klar definierten Inhalten. Wir haben für die verschiedenen Typen Vorlagen im .docx-Format mit markierten Platzhaltern erstellt, die alle Informationen beinhalten, die in den meisten Fällen benötigt werden. Diese könnt ihr frei weiternutzen und mit den Informationen für Eure Organisation und jeweilige Umfrage befüllen. 

Die Download-Links findet ihr in der [Toolbox unter „Datenschutzvorlagen"](/tools#datenschutzvorlagen).

### Rechtsgrundlage
Für jede Verarbeitung personenbezogener Daten benötigt Ihr eine Rechtsgrundlage. Die Vorlagen für die Datenschutzinformation gehen davon aus, dass ihr eine **Einwilligung** nach [Art. 6 Abs. 1 lit. a DSGVO](https://dsgvo-gesetz.de/art-6-dsgvo/) einholt. Als Einwilligung kann bei Online-Umfragen auch gelten, dass Teilnehmende nach Wahrnehmung der Datenschutzinformation willentlich entscheiden, teilzunehmen – es braucht nicht immer ein Feld zum Anhaken. Dann braucht Ihr aber gut sichtbare Formulierungen wie z.B. „Durch Klicken auf Start willigst Du ein…“, denn eine Einwilligung muss „unmissverständlich durch eine bestätigende Handlung“ erfolgen.
Ihr müsst jedoch auch mit einbeziehen, dass Teilnehmende ihre Einwilligung jederzeit widerrufen können und Ihr die mit ihrer Person verbundenen Daten wieder löschen müsst – egal an welchem Zeitpunkt der Auswertung ihr Euch befindet.

Eine belastbare Einwilligung für die Verarbeitung für einen oder mehrere vorab festgelegte Zwecke braucht Ihr aber auf jeden Fall, wenn besonders schützenswerte Daten verarbeitet werden. Das könnt ihr in [Art. 9 DSGVO](https://dsgvo-gesetz.de/art-9-dsgvo/) nachlesen. Darunter fallen Daten, aus denen die rassische und ethnische Herkunft, **politische Meinungen, religiöse oder weltanschauliche Überzeugungen oder die Gewerkschaftszugehörigkeit** hervorgehen. Es betrifft auch die Verarbeitung von genetischen Daten, biometrischen Daten zur eindeutigen Identifizierung einer natürlichen Person, Gesundheitsdaten oder **Daten zum Sexualleben oder der sexuellen Orientierung**. 

Wichtig ist auch, das Verhältnis der Antwortenden zu den Fragenden zu bewerten – so kann bei Mitarbeitenden im Arbeitskontext oft nicht von einer freiwilligen Einwilligung gesprochen werden. Besser wäre es hier, eine Rechtsgrundlage aus dem Arbeitsrecht oder aus Kollektivvereinbarungen zu finden.

In manchen Fällen könnte auch argumentiert werden, dass es um **berechtigte Interessen** nach [Art. 6 Abs. 1 lit. f DSGVO](https://dsgvo-gesetz.de/art-6-dsgvo/) geht. Zum Beispiel könnte eine Mitgliederzufriedenheitsumfrage eines Vereins oder Verbands in Betracht kommen, da sie innerhalb der bestehenden Beziehung erwartbar sind – aber nur, wenn die Fragen nicht unnötig tief in die Privatsphäre eingreifen und Widerspruchsmöglichkeiten bestehen.

Auch für die Wahl der Rechtsgrundlage ist es sinnvoll, sich mit dem Datenschutzbeauftragten Eurer Organisation abzustimmen. Im Zweifelsfall entscheiden sich viele für die Einwilligung.

### Aufnahme ins Verzeichnis von Verarbeitungstätigkeiten
Nach [Art. 30 DSGVO](https://dsgvo-gesetz.de/art-30-dsgvo/) müssen alle Organisationen ein Verzeichnis von Verarbeitungstätigkeiten führen – hier solltet Ihr auch Eure Umfrage aufnehmen.

### Schutzmaßnahmen
Außerdem solltet Ihr technische und organisatorische Maßnahmen („TOM“) ergreifen, um die Verarbeitung der Daten so zu schützen, dass sie tatsächlich nur in dem Rahmen stattfinden, der von den Teilnehmenden erlaubt worden ist. Hier einige beispielhafte Maßnahmen:

**Datensparsamkeit oder Datenminimierung** – Stellt nur Fragen, die für den Zweck der Umfrage wirklich erforderlich sind. Geht besonders kritisch mit Freitextfeldern um.

**Wahl und Konfiguration der Umfragetools** – Aus der DSGVO ergeben sich Vorgaben bzgl. der Auswahl der verwendeten Tools. Besonders wichtig sind dabei der Verzicht auf Weiterverarbeitung von Daten, z.B. beim Tracking, sowie ein Serverstandort innerhalb der EU. Außerdem braucht Ihr einen passenden Auftragsverarbeitungsvertrag. Es gibt in der DSGVO definierte Voraussetzungen wie ein Angemessenheitsbeschluss oder andere geeignete Garantien, unter denen auch Anbieter außerhalb der EU genutzt werden können. Hierbei braucht es aber besondere Sorgfalt, da es nicht ausreicht, dass das Unternehmen „auch“ Server in der EU hat. Unsere [Bewertungsmatrix zur Auswahl eines passenden Online-Umfragetools](https://civic-data.de/app/uploads/Umfragetools_Bewertungen.xlsx) zeigt auch Angaben der Vertreiber zur DSGVO Konformität der aufgeführten Tools. Die Übermittlung von Daten in Drittländer muss auch in den Datenschutzinformationen offengelegt werden.  

**Sichere Speicherung der Daten** – Auch die verwendeten Tools zur Ablage der Daten müssen diesen Kriterien entsprechen. Außerdem muss über ein geeignetes Rechte- und Rollenkonzept sichergestellt sein, dass nur berechtigte Personen Zugriff haben. Schließlich braucht Ihr geeignete Löschfristen, die Ihr ebenfalls bereits in den Datenschutzinformationen hinterlegt. Sobald die Daten für den Zweck nicht mehr nötig sind, sind sie zu löschen oder zu anonymisieren, sofern keine Aufbewahrungspflichten entgegenstehen. Zur Sicherheit gehören aber auch eine Transportverschlüsselung (HTTPS/TLS) und starke Passwörter sowie regelmäßige Updates Eurer Systeme.
Auch die oben in den Typen schon berücksichtigte Maßnahmen wie getrennte Speicherung von Kontraktdaten und Antworten, Pseudonymisierung und Anonymisierung sind Maßnahmen zum Schutz personenbezogener Daten.

**Interne Prozesse** - Um im Falle von Nachfragen und Löschanforderungen handeln zu können, braucht Ihr intern einen praktikablen Prozess, um Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und Widerruf einer Einwilligung bearbeiten zu können. Bei Online-Umfragen ist das nur realistisch, wenn Ihr schon vorab wisst, ob und wie einzelne Datensätze einer Person zugeordnet werden können.
Interne Prozesse müssen auch vorab für den Fall einer Datenpanne verabredet sein. Diese tritt ein, wenn Antworten versehentlich offengelegt, falsch versendet oder unbefugt abgerufen werden.

Viele dieser Maßnahmen werden in Organisationen zentral durch die Datenschutzbeauftragten, die IT Administration und andere Akteur*innen eingerichtet und müssen nicht für jede Umfrage neu geklärt werden. Dennoch solltet Ihr sicherstellen, dass Ihr diesbezüglich gut informiert seid, wenn Ihr eine Online-Umfrage startet.

### Datenschutzfolgeabschätzung
Wenn die Umfrage voraussichtlich ein hohes Risiko für Rechte und Freiheiten der Betroffenen mit sich bringt, müsst Ihr mithilfe Eures Datenschutzbeauftragten vorab eine Datenschutz-Folgenabschätzung durchführen. Das kann z. B. eher relevant werden bei sensiblen Daten, sehr großen Datensätzen, Profiling, besonders schutzbedürftigen Gruppen oder systematischer Auswertung. Ein Beispiel könnte eine bundesweite Online-Befragung einer Opferhilfe-Organisation zu häuslicher oder sexualisierter Gewalt sein – oder eine Umfrage unter Minderjährigen zu Suizidalität, Selbstverletzung oder Missbrauchserfahrungen. Viele zivilgesellschaftliche Themen fallen unter die besonders schutzwürdigen Daten.

## Häufige Fehler
Bei Umfrageprojekten, die wir im Civic Data Lab als Datenvorhaben oder in der Datensprechstunde kennengelernt haben, kam es oft zu ähnlichen Stolpersteinen. Dies sind keine „großen“ Rechtsverstöße, sondern liegen in mangelndem Verständnis bei der Konzeption. Wir haben daher ein paar zusammengestellt, damit Ihr in Euren Projekten darauf achten könnt.

###Über Datenschutz erst nach der Erhebung nachdenken
Es kommt immer wieder vor, dass Online-Umfragen in der Zivilgesellschaft durchgeführt werden und versehentlich als anonym eingestuft sind, obwohl beispielsweise eine Re-Identifizierung möglich ist. Im Nachgang ist es dann zu spät, um eine Rechtsgrundlage für die Verarbeitung personenbezogener Daten zu schaffen und die Teilnehmenden zu informieren. Oft wird einfach gestartet, ohne klar festzulegen, ob die Umfrage auf Einwilligung, Vertrag, gesetzlicher Pflicht oder berechtigten Interessen beruht. Gerade bei „berechtigten Interessen“ ist der Fehler häufig, dass keine echte Abwägung gemacht wird und die vernünftigen Erwartungen der Teilnehmenden nicht geprüft werden. Transparenz allein ersetzt diese Abwägung nicht.
Das kann dazu führen, dass die Antworten, die die Identifizierung von Einzelpersonen ermöglichen, unausgewertet gelöscht werden müssen. Daher gehört die Thematisierung des Datenschutzes zur Konzeption einer Umfrage.

### Fälschlich von „anonym“ sprechen
Viele Online-Umfragen werden als anonym bezeichnet, obwohl das Tool technische Zusatzdaten verarbeitet oder die Antworten über seltene Merkmalskombinationen bzw. Freitexte doch einzelnen Personen zugeordnet werden könnten. Der praktische Fehler ist also weniger das Wort selbst als die fehlende ehrliche Risikoanalyse.

### Keine Zeit für Überarbeitung einplanen
Die Absprachen mit den Datenschutzbeauftragten und die notwendigen Überarbeitungen innerhalb des Fragebogens sowie bei den Prozessen und sonstigen Schutzmaßnahmen können unter Umständen den Zeitplan für die Umfragedurchführung durcheinanderbringen und haben schon viele in Stress versetzt. Hier hilft nur, genau Zeit einzuplanen.

### Zu viele Fragen und unnötige Daten
Häufig werden mehr Daten erhoben als für den Zweck nötig sind: genaue Geburtsdaten statt Altersgruppen, genaue Orte statt Regionen, Freitextfelder ohne Not, Kontaktdaten „vorsorglich“ oder weil es schon immer so gemacht wurde. Hier besteht aber auch immer eine Abwägung, da zu starke Generalisierung zu schwieriger Vergleichbarkeit mit anderen Datensätzen führt. Gemeinsame Standards können hier Abhilfe schaffen.

### Später entstehen weitere Ideen für die Nutzung von Daten, diese sind aber nicht im Zweck der Datenverarbeitung enthalten, über den die Nutzer*innen informiert worden sind.
Daten nicht für jeden Zweck neu zu erheben, ist grundsätzlich sinnvoll – schon allein, um die zeitlichen Ressourcen der Befragten zu schonen. Oft entstehen Ideen für weitere Anwendungen aber erst, wenn die Daten vorliegen. Dann ist eine weitere Verwendung jedoch nicht mehr zulässig. Eine Idee könnte sein, in Pre-Test mithilfe von KI synthetische Daten zu erzeugen, die ebenfalls helfen, Ideen zu entwickeln. Außerdem sollten Auswertungsmethoden vorab schon ins Auge gefasst werden. Auch Maßnahmen zur Anonymisierung können helfen, um Daten dann weiterverwenden zu dürfen.

### Datenschutzinformationen zu kompliziert
Häufig basieren die veröffentlichten Datenschutzerklärungen auf Texten von Jursit*innen in komplizierter Sprache, die jede Eventualität absichern. Diese Informationen werden jedoch nur von wenigen Menschen wirklich gelesen und erfasst. Gerade bei Umfragen, mit denen sich zivilgesellschaftliche Organisationen an Klient*innen wenden, ist es ihre Verantwortung die begleitenden Informationen niedrigschwellig zu gestalten.

### Zugriff auf Daten durch gemeinsame Toolnutzung ungeklärt
In vielen Organisationen kommt es zu Unsicherheiten, wenn Tools gemeinsam administriert werden oder Zugänge zum Kostensparen geteilt werden. Wichtig ist, über verschiedene Nutzerkonten und eine Administrierung mit klaren Rollenkonzepten sicherzustellen, dass nur diejenigen auf die Daten zugreifen dürfen, die die Berechtigung haben. Für die genauere Definition ist hilfreich zu klären:
- Wer ist Verantwortlicher? 
- Wer ist Auftragsverarbeiter? 
- Gibt es gemeinsame Verantwortliche ([Art. 26 DSGVO](https://dsgvo-gesetz.de/art-26-dsgvo/))?

### Bei organisationsinternen Tools innerhalb der Cloudumgebung wird der Absender mitgespeichert
Wer die Forms-Anwendungen innerhalb der eigenen Organisationsumgebung bei Google oder Microsoft verwendet, sollte sicherstellen, dass keine Daten über eingeloggte Absender*innen der Formulare mitgespeichert werden.

### Löschen wird vergessen oder die Frist erst gar nicht festgelegt
Für viele ist das Online-Umfrageprojekt abgeschlossen, wenn die Ergebnisse kommuniziert wurden. Das Löschen der Rohdaten wird in der Praxis daher oft vergessen oder aufgeschoben. Schon bei der Planung kann eine Kalendererinnerung zum Ablauf der Frist helfen.

### Kein Abschluss passender Auftragsverarbeitungsverträge
Anbietende von Tools, die Ihr für Online-Umfragen einsetzt, sind Auftragsverarbeiter, mit denen Ihr nach Art. 28 DSGVO einen Vertrag abschließen müsst. Daher seid Ihr dafür verantwortlich, dass sie im Sinne der gesetzlichen Regelegungen agieren und Euer Bemühen darum wird durch einen stimmigen Auftragsverarbeitungsvertrag dokumentiert. Viele Anbieter bieten Verträge zum Download an, die Ihr nur noch prüfen und bei Passung unterzeichnen müsste. Kirchliche Organisationen, deren Datenschutzbestimmungen in KDG oder DSG-EKD benötigen dazu oft noch Ergänzungsvereinbarungen, die sich auf die entsprechenden Paragrafen beziehen.

## Disclaimer
Noch einmal der Hinweis: Wir geben hier keine Rechtsberatung, sondern stellen Grundlagenwissen und Best Practices zusammen.
Wir möchten euch außerdem darauf hinweisen, dass wir zur Erstellung dieser Seite KI genutzt haben und zwar für diese Aufgaben: Verallgemeinerung einer Vorlage für die Datenschutzinformation bei der Online-Umfrage eines unserer Datenvorhaben sowie Vervielfältigung auf verschiedene Typen sowie Sparring für die Inhalte.

---

Wenn die Konzeption steht, ihr also wisst, was ihr herausfinden wollt und welche Konstrukte ihr messen müsst — geht es ans eigentliche Fragebogendesign. Hier wird aus dem theoretischen Rahmen ein konkretes Erhebungsinstrument.

Das Fragebogendesign umfasst mehrere eng verzahnte Schritte:

- **Operationalisierung**: Abstrakte Konzepte in messbare Fragebogenitems übersetzen
- **Frageformulierung**: Verständliche, neutrale und eindeutige Fragen schreiben
- **Antwortformate**: Die richtigen Antworttypen wählen (Skalen, Mehrfachauswahl, offene Fragen etc.)
- **Fragebogenaufbau**: Eine sinnvolle Reihenfolge und Struktur festlegen
- **Pretesting**: Den Fragebogen vor dem Einsatz testen und verbessern

Ein guter Fragebogen zeichnet sich nicht durch möglichst viele Fragen aus, sondern dadurch, dass jede einzelne Frage einen klaren Bezug zu euren Forschungsfragen hat und verwertbare Daten liefert. Weniger ist hier fast immer mehr.

---

Operationalisierung bedeutet, ein theoretisches Konzept so in konkrete Fragebogenitems zu übersetzen, dass die Antworten das Konzept tatsächlich abbilden. Dabei geht es nicht nur um die Formulierung einzelner Fragen, sondern um eine vorgelagerte Entscheidung: Was genau will ich messen, und welche beobachtbaren Indikatoren eignen sich dafür?
 
Viele Fragebogenprobleme, die auf den ersten Blick wie Formulierungsfehler aussehen, sind im Kern Operationalisierungsprobleme. Die Frage ist nicht schlecht *formuliert*, es ist unklar, was sie *messen* soll.
 
## Vom Konstrukt zum Item

Ein Item ist die konkrete einzelne Interaktion der Teilnehmer:innen mit eurem Fragebogen, also eine einzelne Frage oder Aussage, die beantwortet wird oder zu der Stellung bezogen werden soll. Mehrere Items können eine Frage oder ein Konstrukt erfassen. Der Weg vom Konstrukt zum Item folgt einer klaren Logik:

1. **Konstrukt definieren**: Was genau wollt ihr messen? (→ [Messtheorie & Konstrukte](/konzepte-konstrukte))
2. **Dimensionen identifizieren**: Aus welchen Teilaspekten besteht das Konstrukt? Zufriedenheit kann z.B. die Dimensionen Inhalt, Organisation und Atmosphäre umfassen.
3. **Indikatoren festlegen**: Welche beobachtbaren Merkmale zeigen an, ob eine Dimension hoch oder niedrig ausgeprägt ist?
4. **Items und Fragen formulieren**: Wie fragt ihr nach den Indikatoren, z.B. als Bewertung, als Häufigkeit, als Zustimmung zu einer Aussage? (→ [Fragen formulieren](/fragen-formulieren))
5. **Antwortformat wählen**: Welche Skala oder welches Format passt? (→ [Antworttypen](/fragetypen))

> **Praxisbeispiel:**
> Konstrukt: *Wahrgenommene Wirksamkeit eines Beratungsangebots*
> 
> Dimension 1, Wissenszuwachs:
> - Indikator: Subjektive Einschätzung des Lerneffekts
> - Item: *„Durch die Beratung habe ich neue Handlungsmöglichkeiten kennengelernt."* (Likert-Skala)
> 
> Dimension 2, Handlungsfähigkeit:
> - Indikator: Konkrete Umsetzungsschritte
> - Item: *„Nach der Beratung wusste ich, welche konkreten Schritte ich als Nächstes unternehmen kann."* (Likert-Skala)
> 
> Durch diese Zerlegung wird aus dem vagen Wunsch, „die Wirkung zu messen", ein konkreter Fragebogenabschnitt mit interpretierbaren Ergebnissen.

### Vorhandene Skalen nutzen

Für viele Konstrukte existieren bereits erprobte und validierte Fragebogenskalen aus der Forschung. Bevor ihr eigene Items entwickelt, prüft, ob es passende Instrumente gibt. Vorteile:

- Die Items sind bereits auf Verständlichkeit und Messgenauigkeit getestet
- Eure Ergebnisse lassen sich mit anderen Studien vergleichen
- Ihr spart euch Entwicklungsaufwand

Allerdings: Viele wissenschaftliche Skalen sind für den NPO-Kontext zu lang oder zu abstrakt. Es ist legitim, Skalen zu kürzen oder anzupassen. Dokumentiert aber, was ihr verändert habt, damit die Ergebnisse eingeordnet werden können.

## Typische Fehler

### Konstrukt nicht definiert

Ohne eine klare Konstruktdefinition formuliert ihr Items ins Blaue. Das Ergebnis: Fragen, die „irgendwie" zum Thema passen, aber nicht systematisch ein Konstrukt abbilden.

### Zu wenig Indikatoren

Ein einzelnes Item pro Konstrukt ist riskant: Wenn die Frage missverstanden wird oder unglücklich formuliert ist, habt ihr keine Möglichkeit, das in der Auswertung zu erkennen. Mindestens zwei bis drei Items pro Konstrukt erhöhen die Messgenauigkeit.

### Indikatoren und Konstrukt verwechselt

Manchmal wird ein Indikator mit dem Konstrukt gleichgesetzt. *„Wie oft besuchen Sie unsere Veranstaltungen?"* misst Besuchshäufigkeit. Das ist ein möglicher Indikator für Engagement, aber nicht dasselbe wie Engagement.

> **Praxisbeispiel:**
> Die Frage *„Würden Sie Ihre Erfahrungen oder Ihr Wissen mit anderen Organisationen teilen und sich mit anderen Organisationen austauschen?"* lässt auf ein Operationalisierungsproblem schließen: Das eigentliche Konzept  (*Relevanz bestimmter Austauschformate*) ist in der Frage nicht erkennbar. Stattdessen wird pauschal nach Austauschbereitschaft gefragt. Die Frage ist zudem suggestiv: Wissen und Erfahrungen zu teilen ist sozial erwünscht, kaum eine Organisation würde hier offen mit Nein antworten. Auch wenn alle Befragten zustimmen, weiß man nicht, was dieses Ja bedeutet.
>  
> Eine saubere Operationalisierung beginnt mit dem Konzept und fragt: Welche beobachtbaren Indikatoren bilden es ab? Wenn das Konzept *Relevanz bestimmter Austauschformate* ist, benötigt man keine Ja/Nein-Frage zur allgemeinen Bereitschaft, sondern eine Frage, die konkrete Formate zur Auswahl stellt. Deshalb wurde die Multiple-Choice-Frage *„Welche dieser Formate des Austauschs mit anderen Organisationen sind für Sie grundsätzlich relevant?"* gewählt. So wird statt einer hypothetischen Bereitschaft die konkrete Relevanz einzelner Formate erfragt, und die Antworten sind direkt interpretierbar.

---

Die Reihenfolge der Fragen und ihre logische Verknüpfung beeinflussen, wie Teilnehmer:innen antworten – und damit die Qualität eurer Daten. Ein guter Fragebogen führt die Befragten klar durch das Thema und vermeidet, dass die Struktur selbst zu Verzerrungen führt.

## Grundstruktur

Ein typischer Fragebogen folgt einem klaren Aufbau, manchmal auch "Dramaturgie" (Porst, 2014) genannt:

1. **Einleitung/Titelseite**: Zweck der Befragung, Datenschutz, geschätzte Dauer. Die Einleitung sollte "Werbewirksamkeit" (Porst, 2014) haben, um Aufmerksamkeit zu wecken und die Bereitschaft zum Ausfüllen zu erhöhen.
2. **Aufwärmfragen**: Einfache, niedrigschwellige, aber auch spannende Fragen zum Einstieg. Sie sollen die Teilnehmenden binden und Abbrüche verhindern.
3. **Hauptteil**: Kernfragen, thematisch gruppiert und logisch geordnet.
4. **Sensible Fragen**: Heikle oder persönliche Themen erst, wenn Vertrauen auf
5. **Soziodemografie**: Alter, Geschlecht etc. meist am Ende.
6. **Abschluss/letzte Seite**: Ein Dankeschön und die Möglichkeit, sich in einem offenen Format zur Umfrage zu äußern.

## Antwortverzerrungen

Position und Formulierung von Fragen können das Antwortverhalten systematisch beeinflussen. Solche Verzerrungen lassen sich nicht vollständig vermeiden, aber durch bewussten Aufbau reduzieren.

### Ermüdungseffekte

Mit zunehmender Länge sinkt die Antwortqualität: Teilnehmer:innen klicken schneller, weniger differenziert oder brechen ab. Wichtige Fragen daher nicht ans Ende stellen und die Gesamtlänge realistisch halten.

### Reihenfolgeeffekte

Die Position einer Frage beeinflusst, wie sie beantwortet wird. In Befragungen ziehen Teilnehmer:innen frühere Fragen und Antworten heran, um spätere zu interpretieren und zu beantworten. Dies hat kognitive und normative Ursachen (vgl. Dillman et al. (2014)):

**Kognitive Ursachen:**

- **Priming**: Frühere Fragen aktivieren bestimmte Inhalte, die beim Beantworten späterer Fragen leichter abrufbar sind. 
- **Carryover**: Frühere Bewertungen werden in spätere übertragen.
- **Anchoring**: Eine erste Frage setzt einen Maßstab. Das kann zu Assimilation *oder* Kontrast führen – je nachdem, ob Befragte Ähnlichkeiten oder Unterschiede zwischen den Themen wahrnehmen. 
- **Subtraction**: Argumente, die für die erste Antwort genutzt wurden, werden bei der zweiten ausgeklammert.

**Normative Ursachen:**

- **Fairness/Evenhandedness**: Wer eine Gruppe streng beurteilt hat, wendet denselben Maßstab auch auf andere an.
- **Konsistenz**: Befragte wollen konsistent erscheinen und passen spätere Antworten an frühere an.

> **Praxisbeispiel:**
> Ein klassisches Beispiel stammt aus einer Studie, in der Reihenfolgeeffekte erstmals systematisch beobachtet wurden:
> 
> > [Hyman und Sheatsley stellten] einer Reihe Personen die Frage, ob es einem kommunistischen Reporter gestattet sein sollte, über seinen Besuch in den Vereinigten Staaten zu berichten. Platzierten sie einen entsprechenden Indikator, nachdem Auskunft darüber eingeholt wurde, ob es denn einem amerikanischen Reporter erlaubt sein sollte, über die Sowjetunion zu berichten, so antworteten 73 Prozent der Befragten mit Ja. Wurde die Fragereihenfolge jedoch verändert, so betrug die Zustimmung nur noch 37 Prozent. (Häder & Kühne, 2009)
> 
> Wurde also zuerst nach dem amerikanischen Reporter gefragt, fühlten sich die Befragten offenbar einer gewissen Konsistenz verpflichtet: Wer dem US-Reporter Berichterstattung zugestand, konnte sie dem sowjetischen schlecht verweigern.

#### Was ihr beachten solltet

**Generelle** Fragen gehören meist vor **spezifische**, und **thematisch zusammenhängende** Fragen sollten **gebündelt** werden; aber nicht so, dass eine Frage die nächste inhaltlich vorwegnimmt.

## Filterführung

Filterführung sorgt dafür, dass Teilnehmer:innen nur die Fragen sehen, die für sie relevant sind. Das verkürzt den Fragebogen, erhöht die Datenqualität und vermeidet Frust. Eine Filterfrage entscheidet, welche Folgefragen angezeigt werden.

> **Praxisbeispiel:**
> Man möchte erfassen, ob Organisationen Auswirkungen des Inkrafttretens eines Gesetzes beobachten. Bevor man fragt, ob dies der Fall ist, sollte man zunächst filtern, ob die Organisationen dieses Gesetz überhaupt kennen. Sonst beantworten alle Befragten eine für sie irrelevante Frage.

---

Eine sehr gute Anleitung des Ministeriums für Digitales mit den häufigsten Fehlern beim Formulieren von Fragen und Beispielen wie man es besser machen kann findet ihr in den [Servicestandards](https://servicestandard.gov.de/handbuch/anleitungen/formulare-mit-verstaendlichen-fragen-gestalten/).

Als generelle Regeln gelten bei der Formulierung von Fragebogenfragen nach Porst et al. (2019) folgende Punkte:

1. **Einfache, unzweideutige Begriffe verwenden**, die von allen Befragten gleich verstanden werden. Was „einfach" bedeutet, hängt stark von der Zielgruppe ab.
2. **Kurze, einfache Fragen formulieren.** Lange Fragen verwirren und enthalten oft überflüssige Informationen.
3. **Keine hypothetischen Fragen stellen.** Befragte können sich oft nicht zuverlässig in Situationen versetzen, in denen sie nicht sind.
4. **Doppelte Stimuli und Verneinungen vermeiden.** Eine Frage sollte immer nur einen Sachverhalt abfragen.
5. **Keine Unterstellungen oder suggestive Formulierungen.** Diese schränken den Antwortspielraum der Befragten ein.
6. **Keine Fragen zu Informationen, über die Befragte mutmaßlich nicht verfügen.** Fehlendes Wissen senkt die Motivation und verschlechtert die Datenqualität.
7. **Eindeutigen zeitlichen Bezug herstellen.** Vage Zeitangaben wie „in den letzten Wochen" sind zu vermeiden; konkrete Anker wie „im September 2018" sind besser.
8. **Antwortkategorien erschöpfend und disjunkt gestalten.** Jede Person muss sich eindeutig einer Kategorie zuordnen können.
9. **Kontexteffekte kontrollieren.** Vorherige Fragen können die Beantwortung späterer Fragen beeinflussen. Dies lässt sich am besten durch Pretests prüfen.
10. **Unklare Begriffe definieren.** Wenn Vereinfachung nicht möglich ist, sollten Fachbegriffe erklärt werden.

Bei der Frageformulierung spielt auch das [Antwortformat](/fragetypen) eine Rolle: Offene Fragen ohne vorgegebene Antworten müssen möglicherweise genauer formuliert werden als geschlossene Fragen, da vorgegebene Antwortoptionen zum Kontext beitragen und somit das Verständnis erleichern (Porst, 2014).

> **Praxisbeispiel:**
> Die Frage *„Wie gut arbeitet Ihre Organisation im Moment mit der Stadt oder dem Landkreis zusammen?"* ist ein klassischer **doppelter Stimulus** (Regel 4): Sie fragt gleichzeitig, *ob* eine Zusammenarbeit stattfindet, und *wie gut* diese läuft. Das Problem zeigt sich an den Antwortoptionen — neben einer Bewertungsskala (z.B. „eher gut") bräuchte man zusätzlich die Option „es gibt keine Zusammenarbeit", was die Skala sprengt.
> 
> Besser wäre eine vorgelagerte Filterfrage (*„Arbeitet Ihre Organisation mit der Stadt oder dem Landkreis zusammen?"*). Nur bei Ja folgt dann die Folgefrage zur Qualität der Zusammenarbeit.

---

Der grundlegendste Unterschied beim Umfragedesign besteht zwischen **geschlossenen Fragen**, 
bei denen die Befragten aus vordefinierten Optionen auswählen, und **offenen Fragen**, bei 
denen sie frei in eigenen Worten antworten. Beide dienen unterschiedlichen Erkenntniszielen 
und sind mit spezifischen Tradeoffs verbunden.

Geschlossene Fragen sind kognitiv weniger anspruchsvoll und für Befragte, insbesondere in 
Online-Umfragen, einfacher zu beantworten, da sie lediglich einen Tastendruck oder Mausklick 
erfordern. Allerdings können vorgegebene Antwortoptionen den Teilnehmenden implizit 
signalisieren, welche Antworten als vernünftig oder erwünscht gelten, und dadurch die Antworten 
in eine bestimmte Richtung lenken. Offene Fragen umgehen diesen Effekt, bringen jedoch eigene 
Herausforderungen hinsichtlich Datenqualität, Vollständigkeit und Analyseaufwand mit sich 
(Connor Desai & Reimers, 2019). 

Offene Fragen sind das zentrale Instrument der qualitativen Forschungstradition in den 
Sozialwissenschaften. In dieser Wissenssammlung wird jedoch vorrangig ein quantitativer Ansatz verfolgt; offene Fragen werden daher vor allem als Ergänzung zu geschlossenen Formaten behandelt.

Eine weitere Unterscheidung betrifft den Unterschied zwischen einzelnen Fragen und 
Fragebatterien: Werden mehrere thematisch zusammenhängende Fragen als Gruppe eingesetzt, 
spricht man üblicherweise von **Items**. Dieser Begriff ist in der deutschsprachigen 
Methodenliteratur etabliert und wird im Folgenden entsprechend verwendet.

Für alle nachfolgend beschriebenen Fragetypen werden exemplarisch Umsetzungsmöglichkeiten 
in xlsform und DDI Codebook, sowie Darstellungsmöglichkeiten in zwei gängigen Umfragetools 
vorgestellt.

## Geschlossene Fragetypen

### 1. Single Choice

Bei Single-Choice-Fragen wählt die befragte Person genau eine Option aus einer vorgegebenen, abgeschlossenen Liste aus.

#### Wann sollte Single Choice verwendet werden?

Single Choice eignet sich, wenn die Antwortkategorien **erschöpfend und trennscharf** formuliert werden können, d. h. alle relevanten Ausprägungen des Merkmals abdecken, ohne sich zu überschneiden (z. B. Altersgruppen, Bildungsabschluss, Beschäftigungsstatus), (Holbrook & Lavrakas, 2008) 

#### Layout für wenige Antwortoptionen

Bei Fragen mit einer einzigen Antwortmöglichkeit sollten in den meisten Fällen vertikale Radio Buttons verwendet werden. In Kobo Toolbox und in Lime Survey ist die vertikale Darstellung Standard. 

**XLSForm survey:**
```
type                    | name         | label                                  
----------------------- | ------------ | ---------------------------------------
select_one bildungsgrad | bildungsgrad | Was ist Ihr höchster Bildungsabschluss?
```

**XLSForm choices:**
```
list_name    | name | label                          
------------ | ---- | -------------------------------
bildungsgrad | 1    | Kein Abschluss                 
bildungsgrad | 2    | Haupt- oder Realschulabschluss 
bildungsgrad | 3    | Fachhochschulreife / Abitur    
bildungsgrad | 4    | Abgeschlossene Berufsausbildung
bildungsgrad | 5    | Hochschulabschluss             
```

#### Layout für viele Antwortoptionen (Single Choice)

Das Layout für lange Auswahllisten sollte anders sein als bei kurzen Listen: 100 Radio Buttons überladen das gesamte Umfrage-Layout.

Eine Option sind **Dropdowns**, durch die die Nutzer:in zu der Antwortoption scrollen kann. Bei langen Listen im Web/auf dem Desktop (wie z. B. Ländern oder Berufen) kann ein Dropdown geeignet sein, um Platz auf dem Bildschirm zu sparen. Dropdowns können jedoch bei sehr langen Listen (z. B. 100+ Optionen) ebenfalls unübersichtlich sein. Experimentelle Studien zeigen, dass ein Autocomplete-Feld (bei dem Befragte die ersten Buchstaben eingeben und passende Optionen gefiltert angezeigt werden) bei langen Listen mehr verwertbare Antworten liefert als ein einfaches Textfeld und schneller ist als ein klassisches Dropdown [Citation].

Bei Autocomplete ist jedoch zu beachten, dass sich die kognitive Aufgabe verändert: Während geschlossene Fragen mit sichtbarer Optionsliste einer Wiedererkennungsaufgabe (Recognition) ähneln, funktionieren offene Eingabeformate eher wie Aufgaben des freien Abrufs (Recall), die auf kontrollierten Gedächtnisprozessen basieren. Empirische Befunde legen nahe, dass offene und geschlossene Antwortformate auf unterschiedlichen kognitiven und mnestischen Prozessen beruhen und daher zu unterschiedlichen Ergebnissen führen können [Citation]. Autocomplete eignet sich daher vor allem für Fragen, bei denen die Befragten die Antwort bereits kennen (z. B. das eigene Herkunftsland oder eingenommene Medikamente), weniger für Fragen, bei denen Optionen erst durch Ansehen der Liste erkannt werden (z. B. „Welche dieser Marken kennen Sie?").

Kobo Toolbox erlaubt für Single Choice eine Autocomplete-Option, während bei LimeSurvey nur ein Dropdown möglich ist. Über die `appearance`-Spalte in XLSForm kann die Darstellung über den Wert `minimal` zu einem Dropdown geändert werden. 

Beim Fragebogendesign bietet es sich an viele Antwortoptionen über eine seperate Datei oder in einem separaten Sheet, dass dann über eine Formel eingebunden wird, abzubilden. 

In DDI Codebook führen wir die Konvention ein, über den `concept`tag ein vocabular zu referenzieren.

**XLSForm survey:**
```
type                                | name        | label                              
----------------------------------- | ----------- | -----------------------------------
select_one_from_file iso_3166_1.csv | geburtsland | In welchem Land wurden Sie geboren?
```

### 2. Multiple-Choice

Bei Multiple-Choice-Fragen können Befragte alle zutreffenden Optionen auswählen. Jede Option wird als eigene binäre Variable kodiert 
(0 = nicht genannt, 1 = genannt). Strukturell entspricht eine Multiple-Choicefrage einer Batterie aus ebenso vielen Ja/Nein-Fragen, wie Antwortoptionen vorhanden sind.

#### Wann sollte Multiple Choice verwendet werden?

Single Choice ist das methodisch robustere Antwortformat [Citation]. Multiple Choice sollte nur verwendet werden, wenn Antwortoptionen sich **nicht** gegenseitig ausschließen (z.B. genutzte Medien, gesprochene Sprachen oder berufliche Tätigkeitsfelder).

#### Layout für wenige Antwortoptionen

Hier gilt das gleiche wie bei Single Choice.

**XLSForm survey:**
```
type                          | name       | label                                                
----------------------------- | ---------- | -----------------------------------------------------
select_multiple wochenendtage | wochenende | An welchen Tagen des Wochenendes sind Sie erreichbar?
```

**XLSForm choices:**
```
list_name     | name | label  
------------- | ---- | -------
wochenendtage | sa   | Samstag
wochenendtage | so   | Sonntag
```

#### Layout für viele Antwortoptionen

Die Probleme von Dropdowns und vielen Radio Buttons sind ähnlich zu Single Choice, verschärfen sich hier jedoch: sie können dazu führen, dass nur bestimmte oder nicht alle relevanten Optionen ausgewählt werden. Es gibt weder in Kobo Toolbox, noch in Lime Survey gibt es gute und einfach umsetzbare Alternativen. Kobo Toolbox erlaubt einen Mutiple Choice Dropdown, aber kein Multiple Choice Autocomplete. Lime Survey erlaubt beides nicht für Mutiple Choice, es gibt jedoch ein Question Theme, das autocomplete für Multiple Choice ermöglicht.

In Limesurvey gibt es die option das dropdown fpr multiple chocie zu nehmen, oder ein repoeat vom autocompomplet zu nutzen. Leider ist letzteres eher führ mehrer fragen in einer sich wiederholdenden Gruppe gedacht, sodass die Wiederholungen bei vielen ausgewählten Optionen schnell zu viel Platz wegnehmen.

**XLSForm survey:**
```
type                                     | name             | label                                                                     
---------------------------------------- | ---------------- | --------------------------------------------------------------------------
select_multiple_from_file iso_3166_1.csv | besuchte_laender | Welche dieser Länder haben Sie bereits besucht? Mehrere Antworten möglich.
```

## Halb-Offene Antwortformate

Halb-offene Antwortformate nehmen eine Zwischenposition zwischen vollständig geschlossenen und vollständig offenen Frageformaten ein [Citation]. Sie stellen eine vordefinierte, geschlossene Antwortliste bereit (Single oder Multiple Choice) und ergänzen diese um ein optionales Freitextfeld — typischerweise gelabeled als „Sonstiges (bitte angeben)". Dadurch entstehen zwei verschiedene Datentypen innerhalb einer Frage: kategoriale, quantitativ auswertbare Antworten aus der geschlossenen Liste sowie Freitexteingaben, die qualitativ aufbereitet und gesondert analysiert werden müssen.

Der konzeptionelle Vorteil dieses Formats — Erschöpfungsgrad ohne vollständige Offenheit — ist in der Praxis jedoch begrenzt: Befragte nutzen die „Sonstiges"-Option selten und interpretieren die vorgelegte Liste als vollständig, selbst wenn ihre tatsächliche Antwort außerhalb der Kategorien läge [Citation].

Das „Sonstiges"-Feld sollte stets am Ende der Antwortkategorien platziert werden, um Primacy-Effekte zu vermeiden. 

Themen, die wiederholt genannt werden, deuten auf eine Lücke im Kategoriensystem hin und sollten in künftigen Erhebungen als eigenständige Kategorien aufgenommen werden [Citation].

### 1. Single Choice mit „Sonstiges"-Antwortmöglichkeit

Bei Single-Choice-Fragen ist ein „Sonstiges (bitte angeben)"-Feld nur dann gerechtfertigt, wenn das erhobene Merkmal einen offenen Wertebereich hat, der sich nicht vollständig vorspezifizieren lässt — etwa Geschlecht, Berufsbezeichnung oder Religionszugehörigkeit. Bei Merkmalen mit klar begrenztem Wertebereich (z. B. Altersgruppe, Bildungsabschluss, Beschäftigungsstatus) sollte auf das Feld verzichtet werden, da die Kategorien so formuliert werden können, dass sie erschöpfend und trennscharf sind (Holbrook & Lavrakas, 2008).

#### Layout

**XLSForm survey:**
```
type              | name             | label                                               | relevant               
----------------- | ---------------- | --------------------------------------------------- | -----------------------
select_one quelle | aufmerksam       | Wie sind Sie auf unser Angebot aufmerksam geworden? |                        
text              | aufmerksam_other | Sonstiges (bitte angeben)                           | $ = 'other'
```

**XLSForm choices:**
```
list_name | name           | label                 
--------- | -------------- | ----------------------
quelle    | suchmaschine   | Suchmaschine          
quelle    | empfehlung     | Persönliche Empfehlung
quelle    | soziale_medien | Soziale Medien        
quelle    | other          | Sonstiges             
```

### 2. Multiple Choice mit „Sonstiges"-Antwortmöglichkeit

Bei Multiple-Choice-Fragen ist ein „Sonstiges"-Feld häufiger gerechtfertigt, weil der Antwortraum — also die Menge aller möglichen Auswahlen — im Voraus schwerer vollständig zu antizipieren ist als bei Single-Choice-Fragen.

#### Layout

**XLSForm survey:**
```
type                    | name                | label                              | relevant                  
----------------------- | ------------------- | ---------------------------------- | --------------------------
select_multiple geraete | geraetebesitz       | Welche dieser Geräte besitzen Sie? |                           
text                    | geraetebesitz_other | Sonstiges (bitte angeben)          | $ = 'other'
```

**XLSForm choices:**
```
list_name | name       | label     
--------- | ---------- | ----------
geraete   | smartphone | Smartphone
geraete   | laptop     | Laptop    
geraete   | tablet     | Tablet    
geraete   | other      | Sonstiges 
```

## Geschlossene, gruppierte Antwortformate

### 1. Matrix / Likert-Skala (Grid)

Matrix-Fragen fassen mehrere Items zusammen, die dieselbe Antwortskala und denselben 
Einleitungstext teilen. In DDI 2.5 müssen die Antwortkategorien bei jedem Item wiederholt 
werden.

**XLSForm survey:**
```
type              | name                  | label                      | appearance
----------------- | --------------------- | -------------------------- | ----------
begin_group       | institutionsvertrauen | Vertrauen in Institutionen | table-list
select_one skala5 | vertrauen_parlament   | Das Parlament              |           
select_one skala5 | vertrauen_polizei     | Die Polizei                |           
end_group         |                       |                            |           
```

**XLSForm choices:**
```
list_name | name | label      
--------- | ---- | -----------
skala5    | 1    | Gar nicht  
skala5    | 2    | 2          
skala5    | 3    | 3          
skala5    | 4    | 4          
skala5    | 5    | Vollständig
```

## Offene Antwortformate

### 1. Offene Zahl (Integer)

Offene numerische Fragen erfassen Zahlenwerte ohne vorgegebene Antwortkategorien — z.B. 
Alter, Haushaltsgröße oder Anzahl. 

Einfachauswahl mit vorgegebene Antwortkategorien (z.B. Intervalle) sind 
bei numerischen Fragen problematisch, weil Befragte die mittlere Kategorie als implizite 
Norm interpretieren und ihre Antwort entsprechend anpassen — ein Effekt, der in 
Online-Befragungen auch außerhalb sensitiver Themen nachweisbar ist (Baur et al., 2014).  Weiterhin: Vage Quantoren wie „manchmal", „häufig" oder „selten" werden von verschiedenen Befragten sehr unterschiedlich interpretiert und erzeugen dadurch systematische Messfehler.(Krosnick et al., 2018).  Für numerische Fragen — etwa zur Häufigkeit eines Verhaltens — empfiehlt sich daher grundsätzlich die direkte Abfrage eines konkreten Wertes anstelle vorgegebener Kategorien. 

**XLSForm survey:**
```
type    | name  | label            
------- | ----- | -----------------
integer | alter | Wie alt sind Sie?
```

### 2. Offener Text

Freitextfragen ermöglichen den Befragten, eigene Antworten in Textform zu formulieren — 
z.B. für Kommentare oder offene Rückmeldungen.

#### Wann eignet sich eine offene Texteingabe?

Nach Züll et al. (2019) eignen sich die offene Texteingabe:

- Wenn der Befragungsgegenstand noch nicht eingegrenzt werden kann oder neue, 
  unerwartete Aspekte erwartet werden (explorative Fragebogenentwicklung)
- Wenn das Spektrum möglicher Antworten zu groß für vorgegebene Kategorien ist
- Wenn eine Lenkung des Befragten in Richtung vorgegebener Kategorien vermieden 
  werden soll — vorgegebene Antwortoptionen riskieren, Nennungen zu erzeugen, 
  die Präferenzen des Fragebogenentwicklers statt echte Meinungen widerspiegeln 
- Wenn Wissen abgefragt wird — offene Fragen minimieren die Wahrscheinlichkeit, 
  durch Raten eine richtige Antwort zu erzielen, und führen häufig zu reliableren 
  und valideren Angaben als geschlossene Fragen

**XLSForm survey:**
```
type | name        | label                         
---- | ----------- | ------------------------------
text | anmerkungen | Haben Sie weitere Anmerkungen?
```

## Weitere Empfehlungen für Antwortformate

### „Weiß nicht" und „Keine Angabe"

Eine explizite „Weiß nicht"-Option erhöht den Anteil fehlender Antworten, ohne die Reliabilität zu verbessern. Der Anstieg ist nur teilweise auf echte Meinungslosigkeit zurückzuführen — die Option wird auch als Satisficing-Strategie genutzt und kann suggerieren, dass Expertenwissen zur Beantwortung nötig sei. Ihr Einsatz ist daher kritisch zu sehen (Baur et al., 2014). 

**„Keine Angabe" / „Möchte ich nicht beantworten"** ist konzeptionell von „Weiß nicht" zu trennen: Hier wird nicht Unfähigkeit signalisiert, sondern bewusste Antwortverweigerung. Diese Option sollte bei sensiblen Themen angeboten werden — also bei Fragen, die soziale Erwünschtheit auslösen, als intrusiv empfunden werden oder bei denen Befragte negative Konsequenzen einer Offenlegung befürchten (Tourangeau & Yan, 2007). Typische Anwendungsbereiche sind Einkommen, Gesundheit, Sexualität und politische Zugehörigkeit. Wird bei solchen Fragen stattdessen eine Antwort erzwungen (Forced Answering), steigen die Abbruchquoten — insbesondere bei hochsensiblen Items — und die Antwortqualität sinkt (Décieux et al., 2015).

Bei **Multiple-Choice-Fragen** sollten "Weiß nicht" und "Keine Angabe" als exklusive Optionen implementiert werden: Sobald eine inhaltliche Option gewählt wird, ist eine gleichzeitige Angabe von „Weiß nicht" logisch widersprüchlich und sollte technisch unterbunden werden.

##  Nicht empfohlene Antwortformate

Schieberegler/Slider sollten zugunsten von Radio Buttons vermieden werden. Sie benötigen mehr Zeit zum Ausfüllen, führen zu mehr fehlenden Daten (Funke, 2016) und sind insbesondere auf Mobilgeräten problematisch (Antoun et al., 2017). Entscheidend ist, dass sie keine zuverlässigen kontinuierlichen Daten liefern, denn ein Schieberegler von 0 bis 100 täuscht Präzision nur vor. Radio Buttons sind schneller, besser zugänglich und funktionieren auf allen Geräten gleich.

---

Bevor ein Fragebogen an die eigentliche Zielgruppe geht, sollte er mit einer kleinen Gruppe getestet werden. Das nennt man **Pretest**. Ziel ist, Probleme zu finden, solange sie sich noch beheben lassen, und nicht erst, wenn die ersten 50 Antworten unbrauchbar sind.

Ein Pretest hilft dabei,

- **Fehler** im Fragebogen zu entdecken (Tippfehler, kaputte Filter, falsche Antwortoptionen),
- die **Verständlichkeit** der Fragen aus Sicht der Zielgruppe zu überprüfen,
- die **Ausfülldauer** realistisch abzuschätzen,
- **technische Probleme** zu identifizieren (Mobile-Darstellung, Browser, Ladezeiten),
- die **Akzeptanz** zu prüfen: Wirken Fragen zu lang, zu invasiv, zu kompliziert?

Das Grundvorgehen ist immer dasselbe: kleine Stichprobe testen lassen, Feedback einholen, Anpassungen vornehmen. Bei größeren Änderungen lohnt sich eine zweite Runde. **Wichtig: Auch ein sehr kleiner Pretest, etwa mit zwei oder drei Personen, ist immer besser als gar keiner.**

## Methoden

Es gibt verschiedene Pretest-Methoden, die unterschiedliche Arten von Problemen aufdecken. In der Praxis lassen sie sich gut kombinieren.

### Expert\*innen-Review

Personen mit Fachwissen zum Thema, zur Zielgruppe oder zu Methodik prüfen den Fragebogen, zum Beispiel Kolleg\*innen aus dem Team, methodisch erfahrene Partner\*innen oder Personen, die die Zielgruppe gut kennen.

- **Stark bei**: methodischen Schwächen, problematischen Formulierungen, Logikfehlern.
- **Schwach bei**: Wie eine 60-jährige Ehrenamtliche aus dem Sportverein die Frage tatsächlich versteht, lässt sich so nicht beurteilen.
- **Aufwand**: gering. Schneller erster Check, sollte immer gemacht werden.

> **Praxisbeispiel:**
> Eine Kollegin liest die Frage *„Wie zufrieden sind Sie mit der Zusammenarbeit mit Behörden?"* und merkt an: „Welche Behörden meint ihr? Bei mir wäre die Antwort fürs Finanzamt eine ganz andere als fürs Jugendamt." Die Frage wird daraufhin in eine Matrix mit konkret benannten Behörden umgebaut.

### Kognitive Pretests

Beim kognitiven Pretest füllt eine Person aus der Zielgruppe den Fragebogen aus, während ihr daneben sitzt (oder per Video-Call zuschaut) und beobachtet, wie sie zu ihren Antworten kommt. Es gibt drei Varianten, die sich gut kombinieren lassen:

- **Lautes Denken (Think-Aloud)**: Testpersonen sprechen beim Ausfüllen laut aus, was sie gerade denken. So wird sichtbar, an welchen Stellen sie stocken, rätseln oder die Frage anders verstehen als gemeint.
- **Probing**: Gezielte Nachfragen während oder nach dem Ausfüllen, zum Beispiel *„Was haben Sie unter 'regelmäßig' verstanden?"*, *„Wie sind Sie zu der Antwort 'eher zufrieden' gekommen?"* oder *„Gab es Fragen, bei denen Sie sich unsicher gefühlt haben?"*. Probing fängt auch Aspekte ein, die im reinen Think-Aloud oft untergehen: ob Fragen als zu invasiv, zu lang oder unangenehm wahrgenommen wurden. Damit deckt diese Methode neben dem Verständnis auch die **Akzeptanz** des Fragebogens ab (Lenzner et al., 2015).
- **Verhaltensanalyse**: Beobachten und Notieren von Zögern, Zurückspringen, Korrekturen oder unsicherer Körperhaltung. Funktioniert auch remote über geteilten Bildschirm oder Bildschirmaufnahmen. Findet unbewusste Schwierigkeiten, die Testpersonen selbst nicht benennen würden.

Stark/Schwach/Aufwand zusammengefasst:

- **Stark bei**: Verständnisproblemen, Mehrdeutigkeiten, unklaren Antwortoptionen, ungewohnten Frageformaten (→ [Antworttypen](/fragetypen)), Akzeptanz und unbewussten Schwierigkeiten.
- **Schwach bei**: sensiblen Themen (laut über Einkommen sprechen ist unangenehm). Die Situation ist außerdem künstlich.
- **Aufwand**: höher. Pro Person intensiver plus eine Person, die durchs Interview führt.

> **Praxisbeispiel:**
> Beim Test einer Mitgliederbefragung eines Vereins sagt eine Testperson: *„'Wie häufig nutzen Sie unsere Angebote' — also Angebote, das wären für mich die Workshops. Der Newsletter ist ja kein Angebot, oder doch? Ich klick mal 'manchmal'."* Die Frage misst offenbar nicht, was gemeint war (→ [Konzepte & Konstrukte](/konzepte-konstrukte)). Lösung: Angebote explizit auflisten und als Multiple-Choice abfragen.

> **Praxisbeispiel:**
> Ein Vorstandsmitglied einer kleinen Initiative blättert dreimal im Fragebogen zurück, um sich die Definition von „hauptamtlich" noch einmal anzuschauen, die ganz oben einmal erklärt wurde. Erkenntnis: Definition direkt an die Frage schreiben, nicht nur in die Einleitung (→ [Fragebogenaufbau](/fragebogenaufbau)).

### Pilottest

Beim Pilottest geht der Fragebogen an eine kleine Stichprobe aus der Zielgruppe. Im Unterschied zu den anderen Methoden bekommt ihr hier echte Daten unter realistischen Bedingungen.

Wie groß die Stichprobe sein muss, hängt davon ab, was ihr herausfinden wollt, und ist im NPO-Kontext oft durch das begrenzt, was überhaupt machbar ist. Schon 5–10 Personen reichen, um die Ausfülldauer realistischer einzuschätzen und offensichtliche technische Probleme zu finden. Für aussagekräftige Antwortverteilungen oder Abbruchquoten bräuchte es eigentlich mehr. Das ist für die meisten kleinen Organisationen unrealistisch, aber kein Grund, ganz auf einen Pilottest zu verzichten.

Worauf achten:

- **Ausfülldauer** im Median: oft wird unterschätzt, wie lange das Ausfüllen wirklich dauert.
- **Abbrüche**: An welcher Frage steigen Leute aus?
- **Antwortverteilungen**: Klumpen alle auf einer Skalenstufe? Wählt niemand bestimmte Optionen?
- **Filterlogik**: Landen Leute in den richtigen Zweigen?
- **„Sonstiges"-Freitexte**: Welche Themen tauchen wiederholt auf? Hinweis auf fehlende Kategorien.

> **Praxisbeispiel:**
> Ein Pilottest mit acht Vorstandsmitgliedern kleiner Vereine zeigt: Die geschätzte Ausfülldauer von 5 Minuten lag tatsächlich bei rund 11 Minuten. Zwei Personen brachen bei derselben Matrix mit 15 Items ab, eine dritte merkte im Nachgang an, sie habe „einfach durchgeklickt". Lösung: Matrix in zwei kleinere Blöcke aufgeteilt, drei Items gestrichen, in der Einladung „ca. 10 Minuten" angekündigt.

## Welche Methode wann?

Die richtige Methode hängt ab von:

- **Zeit und Ressourcen**: Habt ihr ein paar Stunden oder mehrere Tage?
- **Komplexität und Sensibilität** des Themas: Bei heiklen Fragen sind kognitive Pretests schwierig.
- **Digital vs. analog**: Pilottest deckt nur bei digitalen Umfragen technische Probleme auf.
- **Zielgruppe und Erreichbarkeit**: Wenn ihr nur schwer an Befragte herankommt, ist ein großer Pilottest unrealistisch.

## Was tun mit den Ergebnissen?

Pretesting bringt nur etwas, wenn die Ergebnisse auch in den Fragebogen einfließen. Hilfreich ist eine kurze Tabelle mit *Frage / gefundenes Problem / Änderung / Entscheidung*. Das hilft beim Überblick und später bei der Methodendokumentation. Nicht jeder Hinweis muss umgesetzt werden, aber jede bewusste Entscheidung gegen eine Änderung sollte dokumentiert und im besten Fall kurz begründet sein. Nach größeren Anpassungen lohnt sich eine zweite, kurze Runde mit ein paar neuen Testpersonen.

## Wenn gar kein Pretest möglich ist

Auch das Feedback von ein, zwei Kolleg\*innen findet zuverlässig Tippfehler, ungeeignete Fragen (→ [Fragen formulieren](/fragen-formulieren)) und technische Probleme wie kaputte Mobile-Darstellung oder lange Ladezeiten.

Wenn wirklich kein Test möglich ist, hilft es auf bereits getestete Fragen und Skalen zurückgreifen. In unserer Fragendatenbank [QWAC](/tools#qwac) findet ihr Fragen, die im NPO-Kontext bereits erprobt wurden.

## KI für Pretesting

Sprachmodelle können einen echten Pretest nicht ersetzen, aber als zusätzlicher Check sind sie nützlich, vor allem, wenn ihr keinen Zugang zu Testpersonen habt.

Zwei pragmatische Anwendungen:

- **Generelles Feedback**: Den Fragebogen einem Sprachmodell vorlegen und nach Klarheit, Neutralität, Reihenfolge und Verständlichkeit fragen. Findet oft offensichtliche Formulierungsprobleme.
- **Personas**: Sprachmodelle können realistische Profile eurer Zielgruppe generieren („ehrenamtlicher Kassenwart, 64 Jahre, städtischer Sportverein") und den Fragebogen aus deren Perspektive durchgehen. Hilft, blinde Flecken zu finden, ersetzt aber keine echten Stimmen.

Wichtig: KI-Antworten sind systematisch zu positiv und zu homogen. Studien zeigen, dass persona-basierte LLM-Antworten zwar Mittelwerte von menschlichen Antworten brauchbar approximieren, aber einen deutlichen Positivitäts-Bias und eine zu geringe Varianz aufweisen (Kaiser et al., 2025)(Bisbee et al., 2024). Sie taugen, um *grobe* Probleme zu finden, nicht, um die Zustimmung in der echten Zielgruppe abzuschätzen.

---

> Hinweis: Diese Seite wurde (abgesehen von einigen Beispielen) maschinell aus dem Englischen übersetzt und gekürzt. Die Originalversion findet ihr unter [xlsform.org/en/](https://xlsform.org/en/). Wegen der Kürzung sollten für forgeschrittene Vorhaben immer diese Website zu Rate gezogen werden.

