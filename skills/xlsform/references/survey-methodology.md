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
   - XLSForm Standard
   - Antworttypen
   - Fragen formulieren
   - Fragebogenaufbau
   - Pretesting

---


# Konzeption

In dieser Phase werden die Forschungsfragen definiert und die Zielpopulation festgelegt.

---

# Studiendesign & Umfragetypen

---

# Forschungsfragen formulieren

---

# Messtheorie & Konstrukte

---

# Stichprobenauswahl

Bevor man eine Umfrage startet, lohnt es sich kurz zu reflektieren: "Wen erreichen wir eigentlich mit unserer Umfrage und insbesondere wen erreichen wir nicht?" Die Antwort auf diese Frage beeinflusst, welche Schlüsse man am Ende ziehen kann.

Stellt euch vor, eine offene Jugend-Werkstatt möchte wissen, wie ihr Angebot bei den Teilnehmenden ankommt. Sie erstellt einen Fragebogen mit Fragen zur Zufriedenheit, zu gelernten Fähigkeiten und zur beruflichen Orientierung. Aber wer füllt den Fragebogen tatsächlich aus? Und was bedeutet das für die Ergebnisse? Genau darum geht es in diesem Text.

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

## Was bedeutet das für die Aussagekraft der Umfrage?

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

# Datenschutz 
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

# Fragebogendesign Einleitung

Hier erfährst du, wie man gute Fragen formuliert und einen logischen Ablauf gestaltet.

---

# Operationalisierung
 
Operationalisierung bedeutet, ein theoretisches Konzept so in konkrete Fragebogenitems zu übersetzen, dass die Antworten das Konzept tatsächlich abbilden. Dabei geht es nicht nur um die Formulierung einzelner Fragen, sondern um eine vorgelagerte Entscheidung: Was genau will ich messen, und welche beobachtbaren Indikatoren eignen sich dafür?
 
Viele Fragebogenprobleme, die auf den ersten Blick wie Formulierungsfehler aussehen, sind im Kern Operationalisierungsprobleme. Die Frage ist nicht schlecht *formuliert* — es ist unklar, was sie *messen* soll.
 
## Vom Konstrukt zum Item
 

## Typische Fehler
 

> **Praxisbeispiel:**
> Die Frage *„Würden Sie Ihre Erfahrungen oder Ihr Wissen mit anderen Organisationen teilen und sich mit anderen Organisationen austauschen?"* lässt auf ein Operationalisierungsproblem schließen: Das eigentliche Konzept  (*Relevanz bestimmter Austauschformate*) ist in der Frage nicht erkennbar. Stattdessen wird pauschal nach Austauschbereitschaft gefragt. Die Frage ist zudem suggestiv: Wissen und Erfahrungen zu teilen ist sozial erwünscht, kaum eine Organisation würde hier offen mit Nein antworten. Auch wenn alle Befragten zustimmen, weiß man nicht, was dieses Ja bedeutet.
>  
> Eine saubere Operationalisierung beginnt mit dem Konzept und fragt: Welche beobachtbaren Indikatoren bilden es ab? Wenn das Konzept *Relevanz bestimmter Austauschformate* ist, benötigt man keine Ja/Nein-Frage zur allgemeinen Bereitschaft, sondern eine Frage, die konkrete Formate zur Auswahl stellt. Deshalb wurde die Multiple-Choice-Frage *„Welche dieser Formate des Austauschs mit anderen Organisationen sind für Sie grundsätzlich relevant?"* gewählt. So wird statt einer hypothetischen Bereitschaft die konkrete Relevanz einzelner Formate erfragt, und die Antworten sind direkt interpretierbar. Diese Frage findet sich auch in unserer [Fragendatenbank](example.com).

---

# XLSForm-Dokumentation

> Hinweis: Diese Seite wurde (abgesehen von einigen Beispielen) maschinell aus dem Englischen übersetzt und gekürzt. Die Originalversion findet ihr unter [xlsform.org/en/](https://xlsform.org/en/). Wegen der Kürzung sollten für forgeschrittene Vorhaben immer diese Website zu Rate gezogen werden.

## Was ist eine XLSForm?

XLSForm ist ein Formularstandard, der entwickelt wurde, um die Erstellung von Formularen in Excel zu vereinfachen. Die Erstellung erfolgt in einem für Menschen lesbaren Format unter Verwendung eines vertrauten Tools, das fast jeder kennt - Excel. XLSForms bieten einen praktischen Standard für den Austausch und die Zusammenarbeit bei der Formularerstellung. Der Einstieg ist einfach, ermöglicht aber die Erstellung komplexer Formulare durch Personen, die mit der unten beschriebenen Syntax vertraut sind.

> Hinweis des CDL: XLSForm kann man in allen Spreadsheet-Tools erstellen, zum Beispiel auch in Google Sheets, [LibreOffice Calc](https://www.libreoffice.org/discover/calc/) oder [Grist](https://www.getgrist.com/).

Die XLSForm wird anschließend in ein [ODK XForm](https://getodk.github.io/xforms-spec/) konvertiert, einen gängigen offenen Formularstandard, der es Ihnen ermöglicht, ein Formular mit komplexen Funktionen, wie z.B. Sprunglogik, auf einheitliche Weise über eine Reihe von Web- und mobilen Datenerfassungsplattformen hinweg zu erstellen.

### Grundlegendes Format

Jede Excel-Arbeitsmappe enthält in der Regel zwei Arbeitsblätter: **„survey"** (Umfrage) und **„choices"** (Auswahlmöglichkeiten). Ein drittes, optionales Arbeitsblatt mit dem Namen **„settings"** (Einstellungen), kann Ihrem Formular zusätzliche Angaben hinzufügen und wird [im Folgenden](#einstellungs-arbeitsblatt) beschrieben.

#### Das Arbeitsblatt „survey"

Dieses Arbeitsblatt gibt Ihrem Formular die Gesamtstruktur vor und enthält den Großteil des Formularinhalts. Es enthält die vollständige Liste der Fragen sowie Informationen darüber, wie diese im Formular angezeigt werden sollen. Jede Zeile steht in der Regel für eine Frage; es gibt jedoch bestimmte weitere Funktionen, die im Folgenden beschrieben werden und die Sie dem Formular hinzufügen können, um die Benutzerfreundlichkeit zu verbessern.

#### Das Arbeitsblatt „choices"

Dieses Arbeitsblatt dient dazu, die Antwortmöglichkeiten für Multiple-Choice-Fragen festzulegen. Jede Zeile steht für eine Antwortmöglichkeit. Antwortmöglichkeiten mit demselben **Listennamen** werden als Teil einer zusammengehörigen Auswahlgruppe betrachtet und erscheinen gemeinsam in einer Frage. Auf diese Weise kann eine Auswahlgruppe auch für mehrere Fragen wiederverwendet werden (z. B. Ja/Nein-Fragen).

#### Einrichten Ihrer Arbeitsblätter

Beide Arbeitsblätter enthalten eine Reihe von Pflichtspalten, die vorhanden sein müssen, damit das Formular funktioniert. Darüber hinaus verfügt jedes Arbeitsblatt über eine Reihe von optionalen Spalten, die eine weitere Steuerung des Verhaltens der einzelnen Einträge im Formular ermöglichen, jedoch nicht zwingend erforderlich sind. Jeder Eintrag muss Werte für jede der Pflichtspalten enthalten, die optionalen Spalten können jedoch leer gelassen werden.

- Das **survey**-Arbeitsblatt verfügt über 3 obligatorische Spalten: **type**, **name** und **label**.
  - Die Spalte **type"** gibt den Typ des Eintrags an, den Sie für die Frage erwarten.
  - Die Spalte **„name"** gibt den eindeutigen Variablennamen für diese Eingabe an. Keine zwei Eingaben dürfen denselben Namen haben. Namen müssen mit einem Buchstaben oder einem Unterstrich beginnen. Namen dürfen nur Buchstaben, Ziffern, Bindestriche, Unterstriche und Punkte enthalten. Bei Namen wird zwischen Groß- und Kleinschreibung unterschieden.
  - Die Spalte **„label"** enthält den tatsächlichen Text, den Sie für die Frage im Formular sehen. Alternativ können [Spalten für die Übersetzung der Beschriftungen](#unterstützung-mehrerer-sprachen) verwendet werden.

**survey:**
```
type                         | name              | label                      
---------------------------- | ----------------- | ---------------------------
heute                        | heute             |                            
select_one Bildungsabschluss | Bildungsabschluss | Höchster Bildungsabschluss?
integer                      | Alter             | Alter des Befragten?       
```

- Das Arbeitsblatt **„choices"** enthält ebenfalls drei Pflichtspalten: **list_name**, **name** und **label**.
  - In der Spalte **„list_name"** können Sie eine Reihe miteinander verbundener Antwortmöglichkeiten gruppieren, d. h. Antwortmöglichkeiten, die unter einer Frage gemeinsam angezeigt werden sollen.
  - Die Spalte **„name"** gibt den eindeutigen Variablennamen für diese Antwortoption an.
  - Die Spalte **„label"** zeigt die Antwortoption genau so an, wie sie im Formular erscheinen soll. Alternativ können [Spalten für die Übersetzung der Label](#unterstützung-mehrerer-sprachen) verwendet werden.

**choices:**
```
list_name         | name           | label              
----------------- | -------------- | -------------------
Bildungsabschluss | kein_abschluss | Kein Abschluss     
Bildungsabschluss | hauptschule    | Hauptschulabschluss
Bildungsabschluss | realschule     | Mittlere Reife     
Bildungsabschluss | abitur         | Abitur             
Bildungsabschluss | studium        | Hochschulabschluss 
```

Die Spalten, die Sie Ihrer Excel-Arbeitsmappe hinzufügen, können in beliebiger Reihenfolge erscheinen, unabhängig davon, ob sie obligatorisch oder optional sind. Optionale Spalten können vollständig weggelassen werden. Zeilen oder Spalten können zur besseren Lesbarkeit leer gelassen werden, jedoch werden Daten nach 20 aufeinanderfolgenden leeren Spalten oder Zeilen auf einem Blatt nicht verarbeitet. Die gesamte Formatierung der .xlsx-Datei wird ignoriert, sodass Sie Trennlinien, Schattierungen und andere Schriftformatierungen verwenden können, um das Formular übersichtlicher zu gestalten.

Beim Erstellen von Formularen in Excel ist zu beachten, dass die verwendete Syntax präzise sein muss. Wenn Sie beispielsweise **„Choices"** oder **„choice"** anstelle von **„choices"** eingeben, funktioniert das Formular nicht.

## Fragetypen

XLSForm unterstützt eine Reihe von Fragetypen. Dies sind nur einige der Optionen, die Sie in die Spalte **„type"** im **survey**-Arbeitsblatt Ihres XLSForm eingeben können:

| Fragetyp | Antwort-Eingabe |
|---|---|
| integer | Eingabe einer ganzen Zahl. |
| decimal | Eingabe einer Dezimalzahl. |
| range | [Bereichseingabe](#bereich) (einschließlich Bewertung) |
| text | Freitextantwort. |
| select_one [Optionen] | Multiple-Choice-Frage; es kann nur eine Antwort ausgewählt werden. |
| select_multiple [Optionen] | Multiple-Choice-Frage; es können mehrere Antworten ausgewählt werden. |
| select_one_from_file [Datei] | [Multiple-Choice-Frage aus einer Datei](#mehrfachauswahl-aus-datei); es kann nur eine Antwort ausgewählt werden. |
| select_multiple_from_file [Datei] | [Multiple-Choice-Frage aus Datei](#mehrfachauswahl-aus-datei); es können mehrere Antworten ausgewählt werden. |
| rank [Optionen] | Rangfrage; eine Liste ordnen. |
| note | Zeigt eine Notiz auf dem Bildschirm an, benötigt keine Eingabe. Abkürzung für type=text mit readonly=true. |
| date | Datumsangabe. |
| time | Zeitangabe. |
| calculate | Eine Berechnung durchführen; siehe den Abschnitt [„Berechnung"](#berechnung) weiter unten. |

Eine vollständige Liste der Fragetypen und der Elemente, die diese in der [Vorlage und im Verweis](https://xlsform.org/en/ref-table/) anpassen können, finden Sie hier.

### Mehrfachauswahl

XLSForm unterstützt sowohl „select_one"-Fragen (nur eine Antwort auswählen) als auch „select_multiple"-Fragen (mehrere Antworten auswählen). Sie können die Antwortmöglichkeiten für Multiple-Choice-Fragen direkt im Formular festlegen oder, bei sehr langen Auswahllisten oder solchen, die durch einen externen Prozess aktualisiert werden müssen, [in angehängten Dateien](#mehrfachauswahl-aus-datei).

Um Auswahlmöglichkeiten in Ihrem Formular zu definieren, müssen Sie Ihrer Excel-Arbeitsmappe ein Arbeitsblatt **mit den Auswahlmöglichkeiten** hinzufügen. Hier ist ein Beispiel für eine „select_one"-Frage:

**survey:**
```
type               | name      | label          
------------------ | --------- | ---------------
select_one ja_nein | mag_Pizza | Magst du Pizza?
```

**choices:**
```
list_name | name | label
--------- | ---- | -----
ja_nein   | ja   | Ja   
ja_nein   | nein | Nein 
```

Beachten Sie, dass das Feld **„yes_no"** im Arbeitsblatt **„survey"** mit dem Feld **„yes_no"** in der Spalte **„list_name"** des Arbeitsblatts **„choices"** übereinstimmen muss. Dadurch wird sichergestellt, dass das Formular die richtige Liste mit Antwortmöglichkeiten für eine bestimmte Frage anzeigt. Wir können auch Multiple-Choice-Fragen hinzufügen, bei denen mehrere Antworten ausgewählt werden können, und zwar so:

**survey:**
```
type                           | name              | label                                    
------------------------------ | ----------------- | -----------------------------------------
select_multiple pizza_toppings | favorite_toppings | Was sind deine Lieblingsbeläge für Pizza?
```

**choices:**
```
list_name   | name     | label   
----------- | -------- | --------
Pizzabeläge | Käse     | Käse    
Pizzabeläge | Peperoni | Peperoni
Pizzabeläge | Wurst    | Wurst   
```

Klicken Sie auf den Link, um den vollständigen [Pizza-Fragebogen](https://docs.google.com/spreadsheets/d/1y9LcFUaJ_MDRpqbzHVxkD_k6YzSQCllqh3Excy4iffg/edit?usp=sharing) anzusehen.

#### Namen von Auswahlmöglichkeiten (choices)

Die `name` Spalte des Auswahlblatts definiert die Werte, die gespeichert werden, wenn die jeweilige Auswahl während der Datenerfassung ausgewählt wird. Antwortnamen für **„select_multiple"-Fragen** dürfen keine Leerzeichen enthalten, da Leerzeichen als Trennzeichen verwendet werden, wenn eine Antwort mit mehreren ausgewählten Antworten gespeichert wird. Antwortnamen für „select_one"-Fragen dürfen Leerzeichen enthalten. Wir empfehlen jedoch, diese zu vermeiden, um die Analyse zu vereinfachen. Außerdem ermöglicht dies die Umwandlung der Frage in eine **„select_multiple"-Frage** in einer zukünftigen Formularversion.

Im Allgemeinen sollten die Namen der Auswahlmöglichkeiten innerhalb einer Auswahlliste eindeutig sein. Wenn zwei Auswahlmöglichkeiten derselben Liste denselben Namen haben, lassen sie sich bei der Auswertung nicht voneinander unterscheiden. Bei doppelten Namen der Auswahlmöglichkeiten wird eine Fehlermeldung angezeigt, und Ihr Formular wird nicht konvertiert. In manchen Fällen kann es jedoch sinnvoll sein, doppelte Namen für Auswahlmöglichkeiten zu verwenden. Ein Beispiel hierfür wäre die Verwendung einer [kaskadierenden Auswahl](#kaskadierende-auswahl), bei der die gleichnamigen Auswahlmöglichkeiten durch eine vorangestellte Frage voneinander unterschieden werden. Wenn Sie doppelte Auswahlnamen verwenden müssen, können Sie die Fehler bei der Verwendung der `choice_duplicates` Einstellung:

**settings:**
```
allow_choice_duplicates
-----------------------
yes                    
```

#### Werte in einer Auswahlliste nachschlagen

Sie können dem Auswahlblatt zusätzliche Spalten hinzufügen und dann mithilfe der [Instanzfunktion](#werte-in-auswahllisten-oder-angehängten-dateien-nachschlagen) Werte für diese Spalten nachschlagen.

#### „Anderes angeben"

> **Warnung:** Wir empfehlen generell, [die Spalte `relevant`](#relevant) zu verwenden, um Ihre eigene „Sonstiges"-Option festzulegen. Die in diesem Abschnitt beschriebene Abkürzung funktioniert nur bei Auswahlfeldern ohne Übersetzungen oder choice_filters. Sie verwendet Englisch für die Option „Sonstiges", die nicht angepasst werden kann.

Bei Multiple-Choice-Fragen bieten Umfragen oft die Möglichkeit, **„Sonstiges"** anzukreuzen, wenn die gewünschte Antwortoption nicht aufgeführt ist. In diesem Fall werden die Befragten in der Regel gebeten, die sonstige Option näher zu beschreiben. XLSForm bietet hierfür eine Abkürzung: Fügen Sie im Umfrage-Arbeitsblatt hinter dem Namen der Antwortauswahlliste **„or_other"** ein. Das Arbeitsblatt mit den Antwortoptionen bleibt unverändert. Siehe unten:

**survey:**
```
type                                    | name           | label                                
--------------------------------------- | -------------- | -------------------------------------
select_multiple pizza_toppings or_other | Lieblingsbelag | Was sind deine Lieblings-Pizzabeläge?
```

### Mehrfachauswahl aus Datei

Wenn Sie die Antwortmöglichkeiten für eine Multiple-Choice-Frage in einer separaten Datei bereitstellen möchten, verwenden Sie den Fragetyp **„select_one_from_file"** oder **„select_multiple_from_file"**. Die Verwendung separater Dateien kann die Verwaltung längerer Antwortlisten vereinfachen und die Wiederverwendung von Antwortlisten in verschiedenen Umfragen erleichtern. Es werden drei Dateiformate unterstützt: CSV-, XML- und GeoJSON-Dateien. Siehe Anwendungsbeispiele unten:

**survey:**
```
type                                  | name | label                                | Auswahlfilter 
------------------------------------- | ---- | ------------------------------------ | --------------
select_multiple_from_file country.csv | liv  | In welchen Ländern haben Sie gelebt? |               
select_one_from_file countries.xml    | cou  | In welchem Land lebst du jetzt?      |               
select_one_from_file cities.xml       | cit  | Was ist die nächstgelegene Stadt?    | country=$
select_one_from_file households.csv   | hh   | Wählen Sie die Haushaltsnummer aus   |               
```

Die Dateien müssen ein bestimmtes Format aufweisen. Eine CSV-Datei muss Spalten enthalten, die den Wert und die Bezeichnung der Optionen. Wenn Sie die Spaltennamen `Name` und `die Bezeichnung` verwenden, diese werden automatisch verwendet. Sie können auch Folgendes [die zu verwendenden Spalten angeben](#legen-sie-benutzerdefinierte-spalten-für-bezeichnung-und-wert-fest).

Eine XML-Datei muss die folgende Struktur aufweisen:

```xml
<root>
    <item>
        <name/>
        <label/>
        ...
    </item>
</root>
```

Ein GeoJSON erfordert, dass jedes Feature über eine ID und eine Titel-Eigenschaft verfügt. Das GeoJSON muss durch eine einzige FeatureCollection auf oberster Ebene definiert sein. Weitere Informationen finden Sie in [der ODK-Dokumentation](https://docs.getodk.org/form-datasets/#selects-from-geojson).

CSV-, XML- und GeoJSON-Dateien können zusätzliche Spalten, XML-Knoten oder Merkmale und benutzerdefinierte Eigenschaften enthalten, solange die oben genannten grundlegenden Anforderungen erfüllt sind.

Dieser Fragetyp ist im Allgemeinen die bevorzugte Methode zum Erstellen von Auswahlfragen aus externen Daten, da er am vielseitigsten ist und anwendungsübergreifend funktioniert. Allerdings können Auswahlen aus Dateien mit Zehntausenden von Optionen die Reaktionsgeschwindigkeit des Formulars beeinträchtigen. Wenn Sie lange Auswahllisten haben, prüfen Sie, ob Ihr Formular auf dem Gerät mit der geringsten Leistung, das Ihr Datenerfassungsteam verwenden wird, ausreichend reaktionsschnell ist. Wenn es zu langsam ist, sollten Sie die Verwendung von [dynamischen Auswahlen aus vorgeladenen Daten](#dynamische-auswahl-aus-vorab-geladenen-daten) in Betracht ziehen, sofern Ihre Datenerfassungsanwendung dies unterstützt.

### Rang

Mit dem Rang-Widget können die Befragten eine Liste von Optionen ordnen. Die Antwort wird als geordnete, durch Leerzeichen getrennte Liste von Optionswerten, wobei alle Optionen immer enthalten sind. Die Syntax ist der von Multiple-Choice-Fragen sehr ähnlich.

**survey:**
```
type                | name   | label                                          
------------------- | ------ | -----------------------------------------------
Rang pizza_toppings | Beläge | Bestelle Pizza-Beläge mit deinem Lieblingsbelag
```

**Auswahl:**
```
list_name   | name     | label   
----------- | -------- | --------
Pizzabeläge | Käse     | Käse    
Pizzabeläge | Peperoni | Peperoni
Pizzabeläge | Wurst    | Wurst   
```

Um Verzerrungen zu vermeiden, wird oft empfohlen, die [Zufallsfunktion](#auswahlmöglichkeiten-randomisieren) in Verbindung mit diesem Widget zu verwenden.

### Bereich

Um die Eingabe von ganzen Zahlen oder Dezimalzahlen auf einen bestimmten Bereich zu beschränken, können Sie die Bereichsfrage verwenden. Diese Frage kann mit drei optionalen, durch Leerzeichen getrennten Parametern verwendet werden: **Start**, **Ende** und **Schritt** in einer Parameterspalte. Die Standardwerte sind jeweils 1, 10 und 1.

Das folgende Beispiel erstellt eine Frage, die Eingaben von 0 bis 17 mit einem Schritt von 1 zulässt. Die Verwendung eines Dezimalschritts führt dazu, dass Dezimalwerte erfasst werden.

**survey:**
```
type  | name   | label                 | parameters           
----- | ------ | --------------------- | ---------------------
range | amount | Wie alt ist das Kind? | start=0 end=17 step=1
```

Um eine Bereichsfrage als **Bewertungs-Widget** mit Sternen anzuzeigen, können Sie das Bewertungs-Layout wie unten gezeigt hinzufügen:

**survey:**
```
type  | name   | label                      | appearance | parameters          
----- | ------ | -------------------------- | ---------- | --------------------
range | rating | Welche Bewertung gibst du? | rating     | start=1 end=5 step=1
```

### Metadaten

XLSForm bietet eine Reihe von Datentypoptionen für die Metadatenerfassung:

| Metadatentyp | Bedeutung |
|---|---|
| start | Startdatum und -zeit der Umfrage. |
| end | Enddatum und -zeit der Umfrage. |
| today | Tag der Umfrage. |
| deviceid | Eindeutige Client-Kennung. Kann vom Benutzer zurückgesetzt werden. |
| phonenumber | Telefonnummer (falls vorhanden). |
| username | Konfigurierter Benutzername (falls vorhanden). |
| email | Konfigurierte E-Mail-Adresse (falls vorhanden). |
| audit | Verhalten des Enumerators während der Dateneingabe protokollieren |

Beachten Sie, dass einige Metadatenfelder nur für Formulare auf Mobiltelefonen gelten.

Wenn Sie beispielsweise alle diese Arten von Metadaten erfassen möchten, fügen Sie Folgendes in Ihr Formular ein (in der Regel am Anfang, es kann jedoch an einer beliebigen Stelle im Formular stehen):

**survey:**
```
type        | name          | label | parameters             
----------- | ------------- | ----- | -----------------------
start       | Start         |       |                        
end         | end           |       |                        
today       | heute         |       |                        
deviceid    | Geräte-ID     |       |                        
phonenumber | Telefonnummer |       |                        
username    | Benutzername  |       |                        
email       | E-Mail        |       |                        
audit       | Audit         |       | [optional, siehe unten]
```

Beachten Sie, dass den Metadaten-Fragearten keine Beschriftungen zugeordnet sind. Das liegt daran, dass das Telefon diese Variablen automatisch erfasst. Diese Fragen werden nicht auf dem Bildschirm des Telefons angezeigt, aber Sie sehen sie, wenn Sie Ihre übermittelten Umfragedaten einsehen. Das [Tutorial XLSForm](https://docs.google.com/spreadsheets/d/1OPBXLH8XAVPfyOjoC4-gn2bhZ4hOm2gCtIEyszw0NRo/edit?usp=sharing) zeigt, wie Metadaten in einem Formular verwendet werden.

## Hinweise (hints)

### Allgemeine Hinweise

Manchmal möchten Sie einer Frage in Ihrem Formular einen kleinen Hinweis hinzufügen, der dem Benutzer erklärt, wie er die Frage beantworten soll, aber Sie möchten nicht, dass der Hinweis Teil der Frage selbst ist. In XLSForms ist es ganz einfach, Fragen mit Hinweisen zu versehen. Fügen Sie einfach eine Hinweisspalte hinzu und geben Sie Ihre Hinweismeldung ein. Ein Beispiel finden Sie unten.

**survey:**
```
type     | name     | label                                      | hint                                                    
-------- | -------- | ------------------------------------------ | --------------------------------------------------------
text     | name     | Wie heißt dieses Geschäft?                 | Schau auf das Schild, falls das Geschäft ein Schild hat.
geopoint | geopoint | Erfasse die GPS-Koordinaten dieses Ladens. |                                                         
```

Das [Tutorial XLSForm](https://docs.google.com/spreadsheets/d/1OPBXLH8XAVPfyOjoC4-gn2bhZ4hOm2gCtIEyszw0NRo/edit?usp=sharing) enthält weitere Beispiele für Fragen mit Hinweisen.

 > 18
``` */}

]`
- Um das Element in participants.csv mit dem Namen eines Werts, der aus einer Auswahl stammt, abzurufen:
  `instance('participants')/root/item[name=$]`

Der letzte Teil des Ausdrucks ist ein Eigenschafts- oder Spaltenname, auf den zugegriffen wird, um die Elemente abzurufen, die dem Filterausdruck entsprechen:

- Um das Alter eines Teilnehmers abzurufen, dessen Ausweis gescannt wurde:
  `instance('participants')/root/item[name=$]/age`
- Um den Vornamen eines aus einer Liste ausgewählten Teilnehmers abzurufen:
  `instance('participants')/root/item[name=$]/fname`

Dies ist in der Regel die bevorzugte Methode zum Abrufen von Werten aus angehängten Dateien, da sie am vielseitigsten ist und anwendungsübergreifend funktioniert. Das Abrufen von Werten aus Dateien mit mehreren Zehntausend Optionen kann jedoch die Reaktionsgeschwindigkeit des Formulars beeinträchtigen. Wenn Sie lange Auswahllisten haben, prüfen Sie, ob Ihr Formular auf dem Gerät mit der geringsten Leistung, das Ihr Datenerfassungsteam verwenden wird, ausreichend reaktionsschnell ist. Sollte es zu langsam sein, ziehen Sie die Verwendung von [`pulldata()`](#so-rufen-sie-daten-aus-einer-csv-datei-ab) in Betracht, sofern Ihre Datenerfassungsanwendung dies unterstützt.

> Diese Ausdrücke verwenden eine Teilmenge von [XPath 1.0](https://developer.mozilla.org/en-US/docs/Web/XPath). Der Filterausdruck in eckigen Klammern kann ein beliebiger Ausdruck sein, der zu „wahr" oder „falsch" ausgewertet wird, einschließlich der Verwendung von Funktionen. */}

### Externe CSV-Daten

Wenn Sie eine CSV-Datei an Ihr Formular anhängen möchten, um darin Werte nachzuschlagen, haben Sie mehrere Möglichkeiten. Wenn Sie eine Auswahl aus den Werten dieser CSV erstellen müssen, können Sie [`select_one_from_file`](#mehrfachauswahl-aus-datei) verwenden. Dadurch wird die CSV an Ihr Formular angehängt und Sie können darin Werte nachschlagen, wie oben beschrieben.

Wenn Sie keine Auswahl aus den Werten in Ihrer CSV-Datei erstellen müssen, können Sie den Typ **„csv-external"** verwenden und den Namen der Datei ohne Dateiendung angeben:

**survey:**
```
type         | name       | label      | calculation                                                   
------------ | ---------- | ---------- | --------------------------------------------------------------
csv-external | Teilnehmer |            |                                                               
barcode      | ID         | ID scannen |                                                               
calculate    | Vorname    |            | instance('participants')/root/item[participant_id=$]/fname
```

Das obige Beispielformular fügt die `participants.csv` Liste an das Formular an. Anschließend wird nach einem Barcode-Scan gefragt und verwendet den gescannten Wert, um den Teilnehmer mit der passenden ID in der `participant_id` Spalte. Der Wert in Die `Vorname` Spalte wird in der `Vorname` berechnen.

Beachten Sie, dass XML-Dateien eine beliebige Struktur haben können, daher folgt `/root/item`. `instance` Aufrufe zum Abrufen von Werten aus einer XML-Datei sind möglicherweise nicht.

## Einschränkungen (constraint)

Eine Möglichkeit, die Datenqualität sicherzustellen, besteht darin, den Datenfeldern in Ihrem Formular Einschränkungen hinzuzufügen. Wenn Sie beispielsweise nach dem Alter einer Person fragen, möchten Sie unmögliche Antworten wie -22 oder 200 vermeiden. Das Hinzufügen von Datenbeschränkungen in Ihrem Formular ist ganz einfach. Fügen Sie einfach eine neue Spalte namens **constraint"** hinzu und geben die Formel ein, die die Grenzen für die Antwort festlegt. Im folgenden Beispiel muss die Antwort für das Alter der Person kleiner oder gleich 150 sein. Beachten Sie, wie das `.` in der Formel auf die Fragevariable verweist.

**survey:**
```
type    | name  | label            | constraint
------- | ----- | ---------------- | ----------
integer | Alter | Wie alt bist du? | . <= 150  
```

In diesem Beispiel besagt die Formel `. <= 150`, dass der eingegebene Wert `.` Die Antwort auf die Frage muss kleiner oder gleich 150 sein. Wenn der Benutzer 151 oder mehr als Antwort eingibt, darf er nicht zur nächsten Frage übergehen oder das Formular absenden.

Weitere nützliche Ausdrücke für die Spalte **„Einschränkung"** finden Sie [hier](https://docs.getodk.org/form-logic/). Schauen Sie unter dem Abschnitt **„Operatoren"** nach.

### Einschränkungsmeldung

Wenn Sie Ihrer Einschränkung eine Meldung hinzufügen möchten, die dem Benutzer erklärt, warum die Antwort nicht akzeptiert wird, können Sie Ihrem Formular eine Spalte **„constraint_message"** hinzufügen. Siehe das folgende Beispiel.

**survey:**
```
type    | name                | label               | constraint | constraint_message                                                             
------- | ------------------- | ------------------- | ---------- | -------------------------------------------------------------------------------
integer | Alter des Befragten | Alter des Befragten | . >=18     | Der Befragte muss mindestens 18 Jahre alt sein, um an der Umfrage teilzunehmen.
```

Wenn der Benutzer in diesem Beispiel ein Alter unter 18 Jahren eingibt, wird die Fehlermeldung in der Spalte **„constraint_message"** angezeigt. Weitere Beispiele zu Einschränkungen sind in [diesem XLSForm](https://docs.google.com/spreadsheets/d/1g12xGrOsnNYezG6WtTfeusxzypRT1JHeUC2uNbe03sc/edit?usp=sharing) dargestellt.

## Relevant

Eine großartige Funktion von XLSForm ist die Möglichkeit, eine Frage zu überspringen oder eine zusätzliche Frage anzuzeigen, je nach Antwort auf eine vorherige Frage. Nachfolgend finden Sie ein Beispiel dafür, wie dies durch Hinzufügen einer Spalte **„relevant"** für eine „select_one"-Frage umgesetzt werden kann, wobei wir unser vorheriges Beispiel mit den Pizzabelägen verwenden:

**survey:**
```
type                                     | name           | label           | relevant             
---------------------------------------- | -------------- | --------------- | ---------------------
select_one ja_nein                       | mag_Pizza      | Magst du Pizza? |                      
select_multiple Pizzabeläge oder_anderes | Lieblingsbelag | Lieblingsbelag  | $ = 'ja'
```

In diesem Beispiel wird der Befragte gefragt: „Magst du Pizza?" Wenn die Antwort **„Ja"** lautet, erscheint unten die Frage nach dem Pizzabelag Frage darunter. Beachten Sie die `$` Klammern um die Variable **likes_pizza**. Diese sind erforderlich, damit die auf die Variable aus der vorherigen Frage verweisen kann.

Die Festlegung der Relevanz basierend auf dem Wert einer select_multiple-Frage unterscheidet sich geringfügig von **dem** Beispiel im obigen Beispiel:

**survey:**
```
type                                 | name           | label           | relevant                                                                                                                   
------------------------------------ | -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------
select_one ja_nein                   | mag_Pizza      | Magst du Pizza? |                                                                                                                            
Wähle mehrere Beläge aus oder andere | Lieblingsbelag | Lieblingsbeläge | $ = 'ja'|text|favorite_topping|Käse|Was ist deine Lieblingskäsesorte? |selected($, 'cheese')
```

**choices:**
```
list_name   | name     | label   
----------- | -------- | --------
Pizzabeläge | Käse     | Käse    
Pizzabeläge | Peperoni | Peperoni
Pizzabeläge | Wurst    | Wurst   
```

Da bei der Frage nach dem Pizzabelag mehrere Antworten möglich sind, müssen wir die Funktion `selected($, 'Käse')` verwenden, da die Frage nach dem Käse jedes Mal erscheinen soll, wenn der Benutzer **Käse** als eine der Antworten auswählt (unabhängig davon, ob weitere Antworten ausgewählt werden).

Im Abschnitt [„Sonstiges angeben"](#anderes-angeben) wird erwähnt, dass die Funktion „relevance" verwendet werden kann, um bei Multiple-Choice-Fragen eine Freitext-Option „Sonstiges" anzugeben. Die Vorteile dieser Vorgehensweise gegenüber der Verwendung der Abkürzung **„or_other"** bestehen darin, dass Sie die Kontrolle über den Namen der Auswahlmöglichkeit haben, den Text festlegen können, den der Benutzer sieht, und dass dies auch bei mehrsprachigen Formularen funktioniert. Hier ist ein Beispiel:

**survey:**
```
type                           | name                      | label                                 | relevant                               
------------------------------ | ------------------------- | ------------------------------------- | ---------------------------------------
select_multiple pizza_toppings | Lieblingsbeläge           | Was sind deine Lieblings-Pizzabeläge? |                                        
text                           | Lieblingsbeläge_Sonstiges | Welche anderen Beläge magst du?       | selected($, 'other')
```

**choices:**
```
list_name   | name      | label    
----------- | --------- | ---------
Pizzabeläge | Käse      | Käse     
Pizzabeläge | Peperoni  | Peperoni 
Pizzabeläge | Wurst     | Wurst    
Pizzabeläge | Sonstiges | Sonstiges
```

Beachten Sie, dass Sie **„Sonstiges"** als Antwortmöglichkeit in das Arbeitsblatt **„Antwortmöglichkeiten"** aufnehmen müssen.

## Berechnung

Ihre Umfrage kann Berechnungen anhand der Werte aus den vorhergehenden Fragen durchführen. In den meisten Fällen ist die Verwendung einer Frage vom Typ **„Berechnung"** angemessen. In der folgenden Umfrage haben wir beispielsweise das Trinkgeld für eine Mahlzeit berechnet und es dem Benutzer angezeigt:

**survey:**
```
type      | name      | label                                            | calculation     
--------- | --------- | ------------------------------------------------ | ----------------
decimal   | Betrag    | Wie viel hat das Essen gekostet?                 |                 
calculate | Trinkgeld |                                                  | $ * 0,18
note      | Anzeigen  | 18 % Trinkgeld für Ihre Mahlzeit beträgt: $ |                 
```

Beachten Sie, dass das **`$`** in der letzten Zeile beim Anzeigen und Ausfüllen des Formulars durch den tatsächlichen Trinkgeldbetrag ersetzt wird.

Der Berechnungstyp dient zur Berechnung **von Text**, Berechnungen können jedoch auch zu jedem anderen Fragetyp hinzugefügt werden. Nicht-Text-Typen können für die Datenanalyse nützlich sein, z. B. wenn ein Datum oder eine Datums- und Zeitangabe berechnet wird. **Wenn keine Beschriftung und kein Hinweis angegeben sind, wird die Berechnung ausgeblendet.** Siehe das folgende Beispiel, das dem vorherigen Formular entspricht:

**survey:**
```
type    | name      | label                                            | hint | calculation     
------- | --------- | ------------------------------------------------ | ---- | ----------------
decimal | Betrag    | Wie viel hat das Essen gekostet?                 |      |                 
text    | Trinkgeld |                                                  |      | $ * 0,18
note    | Anzeige   | 18 % Trinkgeld für Ihre Mahlzeit beträgt: $ |      |                 
```

Und dies ist ein Beispiel dafür, wann aufgrund von Anforderungen an die Datenanalyse ein Nicht-Text-Typ benötigt wird:

**survey:**
```
type | name | label | hint | calculation
---- | ---- | ----- | ---- | -----------
date | Tag  |       |      | today()    
```

**Beachten Sie, dass die Verwendung von Berechnungstypen, die kein Text sind, keinen Einfluss auf die Verwendung des Berechnungsergebnisses innerhalb des Formulars selbst hat.** Dies ist ein häufiges Missverständnis.

Wenn eine Beschriftung oder ein Hinweis angegeben wird, wird die Frage im Formular angezeigt und der berechnete Wert erscheint im Eingabefeld oder Widget. Dies wird im Allgemeinen nur für **schreibgeschützte** Fragen empfohlen, um eine Neuberechnung (und damit das Löschen) eines vom Benutzer eingegebenen Werts zu vermeiden. Siehe das folgende Beispiel:

**survey:**
```
type    | name    | label                                  | readonly | calculation     
------- | ------- | -------------------------------------- | -------- | ----------------
decimal | Betrag  | Wie viel hat das Essen gekostet?       |          |                 
note    | Anzeige | 18 % Trinkgeld für Ihr Essen betragen: |          | $ * 0,18
date    | heute   | Das heutige Datum ist:                 | true     | today()         
```

Beachten Sie den Unterschied zum ersten Formular in diesem Abschnitt: Der berechnete Trinkgeldbetrag wird hier anders angezeigt. Im ersten Beispiel wurde er in der Beschriftung angezeigt, im letzten Beispiel hingegen in einem schreibgeschützten Eingabefeld.

```

Dies berechnet einen Zeitstempel unmittelbar nachdem ein Befragter eine Temperatur eingegeben hat. Wenn der Benutzer zurückgeht und die Temperatur ändert, wird der Zeitstempel neu berechnet.

Alle regulären [Berechnungsfunktionen](#berechnung) gelten auch für diese speziellen, durch Wertänderungen ausgelösten Berechnungen. So können Sie z. B. eine Beschriftung oder einen Hinweis verwenden, um dem Benutzer die Berechnungsfrage im Formular anzuzeigen.

Mehrere Fragen können denselben Auslöser haben. Sehen Sie sich dieses Beispiel an, in dem zwei Berechnungen durch die Temperaturfrage ausgelöst werden (eine ist ausgeblendet, die andere wird angezeigt):

**survey:**
```
type          | name    | label                          | calculation        | Auslöser | schreibgeschützt
------------- | ------- | ------------------------------ | ------------------ | -------- | ----------------
integer       | temp    | Temperatur in Celsius eingeben |                    |          |                 
Datum/Uhrzeit | temp_ts |                                | now()              | $  |                 
text          | temp_F  | Temperatur in Fahrenheit       | 32 + 1,8 * $ | $  | true            
calculate     | temp_K  |                                | 273,15 + $   | $  |                 
```

Im obigen Formular wird dem Benutzer die Frage „temp_F" angezeigt und die Frage „temp_K" ausgeblendet, genau wie es der Fall wäre, wenn der Trigger nicht verwendet würde.

Ein wichtiger und leistungsstarker Unterschied zu regulären Berechnungen besteht darin, dass **der Berechnungswert bei Verwendung eines Triggers auch leer sein kann**, was dazu dient, einen Wert aus dem Formular zu löschen. Siehe das folgende Beispiel:

**survey:**
```
type    | name  | label                              | calculation | trigger
------- | ----- | ---------------------------------- | ----------- | -------
text    | name  | Wie heißt die älteste Person hier? |             |        
integer | Alter | Wie alt ist diese Person?          |             | S
```

Wenn der Befragte, der dieses Formular verwendet, den Namen und das Alter von Person A eingegeben hat und anschließend feststellt, dass es eine ältere Person B gibt, wird das Feld „Alter" gelöscht, sobald der Name von Person B eingegeben wurde. */}

## Erforderlich

Es ist ganz einfach, bestimmte Fragen in Ihrem Formular als Pflichtfelder zu kennzeichnen. Wenn Sie sie als Pflichtfelder kennzeichnen, kann der Benutzer nicht zur nächsten Frage übergehen oder das Formular absenden, ohne eine Antwort auf diese Frage eingegeben zu haben.

Um Fragen als Pflichtfelder zu kennzeichnen, fügen Sie Ihrem Umfrage-Arbeitsblatt eine Spalte **„Pflichtfeld"** hinzu. Markieren Sie die Fragen in dieser Spalte als Pflichtfelder, indem Sie **„Ja"** eintragen. Siehe das folgende Beispiel:

**survey:**
```
type    | name  | label            | constraint | erforderlich
------- | ----- | ---------------- | ---------- | ------------
integer | Alter | Wie alt bist du? | . <= 150   | ja          
```

### Erforderliche Meldung

Wenn du die Meldung anpassen möchtest, die Benutzern angezeigt wird, wenn sie eine Pflichtfrage leer lassen, kannst du deinem Formular eine Spalte **„required_message"** hinzufügen. Siehe das Beispiel unten.

**survey:**
```
type    | name                | label               | required | required_message                               
------- | ------------------- | ------------------- | -------- | -----------------------------------------------
integer | Alter des Befragten | Alter des Befragten | ja       | Entschuldigung, diese Antwort ist erforderlich.
```

 | top  | Favorit? |                                 
```

Beachten Sie, dass `once()` verwendet wird, um eine erneute Zufallsauswahl zu verhindern, beispielsweise wenn ein Entwurf zur Bearbeitung geladen wird. */}

## Gruppierung von Fragen

Um eine Gruppe von Fragen in Ihrem Formular zu erstellen, verwenden Sie die Syntax **begin_group…end_group**.

**survey:**
```
type        | name      | label                                                         
----------- | --------- | --------------------------------------------------------------
begin_group | Befragter | Befragter                                                     
text        | name      | Geben Sie den Namen des Befragten ein                         
text        | Position  | Geben Sie die Position des Befragten innerhalb der Schule ein.
end_group   |           |                                                               
```

Dies ist eine gute Möglichkeit, verwandte Fragen für den Datenexport und die Analyse zu gruppieren. Beachten Sie, dass **„Endgruppe"** keinen Namen oder keine Bezeichnung benötigt, da sie im Formular ausgeblendet ist.

In Ihrem Formular können Sie die Darstellung als Feldliste für eine Gruppe verwenden, um mehrere Fragen auf demselben Bildschirm anzuzeigen.

### Gruppen innerhalb von Gruppen verschachteln

Fragengruppen können ineinander verschachtelt werden:

**survey:**
```
type               | name                | label                                           
------------------ | ------------------- | ------------------------------------------------
begin_group        | Krankenhaus         | Krankenhaus                                     
text               | name                | Wie heißt dieses Krankenhaus?                   
begin_group        | hiv_medication      | HIV-Medikamente                                 
select_one Ja_Nein | have_hiv_medication | Verfügt dieses Krankenhaus über HIV-Medikamente?
end_group          |                     |                                                 
end_group          |                     |                                                 
```

Sie müssen immer zuerst die zuletzt erstellte Gruppe beenden. Die erste **Endgruppe**, die Sie sehen, schließt beispielsweise die Gruppe „HIV-Medikamente", und die zweite schließt die Gruppe „Anfangskrankenhaus". Wenn Sie mit Gruppen arbeiten und beim Hochladen Ihres Formulars immer wieder Fehlermeldungen erhalten, überprüfen Sie bitte, ob Sie für jede **Startgruppe** eine **Endgruppe** haben.

### Überspringen

Eine praktische Funktion von XLSForm ist die Möglichkeit, eine Gruppe von Fragen zu überspringen, indem man die Gruppenfunktion mit der [entsprechenden](#relevant) Syntax kombiniert. Wenn Sie eine Gruppe von Fragen auf einmal überspringen möchten, setzen Sie das entsprechende Attribut wie folgt an den Anfang einer Gruppe:

**survey:**
```
type               | name  | label                                         | relevant   
------------------ | ----- | --------------------------------------------- | -----------
integer            | Alter | Wie alt bist du?                              |            
begin_group        | Kind  | Kind                                          | $ <= 5
integer            | MUAC  | Erfassen Sie den Oberarmumfang dieses Kindes. |            
select_one ja_nein | mrdt  | Ist der Schnelltest des Kindes positiv?       |            
end_group          |       |                                               |            
```

Im obigen Beispiel werden die beiden Fragen zur Untergruppe (**muac** und **mrdt**) nur angezeigt, wenn das **Alter** des Kindes aus der ersten Frage fünf Jahre oder weniger beträgt.

 $ - $
text         | Vorname       | Vorname                          
text         | Nachname      | Nachname                         
integer      | Alter         | Alter                            
end_group    |               |                                  
end_repeat   |               |                                  
```

Das XLSForm-Formular [„Delivery Outcome"](https://docs.google.com/spreadsheets/d/1_gCJml_FzJ4qiLU-yc67x1iu_GL-hfU3H8-HvINsIoE/edit?usp=sharing) ist ein weiteres Beispiel für eine Wiederholung.

### Feste Wiederholungsanzahl

Anstatt eine unbegrenzte Anzahl von Wiederholungen zuzulassen, kann der Formular-Designer mithilfe der Spalte **„repeat_count"** eine genaue Anzahl von Wiederholungen festlegen:

**survey:**
```
type         | name              | label                     | repeat_count
------------ | ----------------- | ------------------------- | ------------
begin_repeat | Unterwiederholung |                           | 3           
text         | name              | Name des Kindes           |             
decimal      | Geburtsgewicht    | Geburtsgewicht des Kindes |             
end_repeat   |                   |                           |             
```

Im obigen Beispiel werden genau **3** untergeordnete Wiederholungen erstellt.

### Dynamische Wiederholungsanzahl

Die Wiederholungsanzahl kann auf einen Ausdruck gesetzt werden, der sich auf andere Felder im Formular bezieht. Im folgenden Beispiel bestimmt die Zahl, die der Benutzer für das Feld **„num_hh_members"** eingibt, die Anzahl der hinzugefügten „hh_member"-Wiederholungen:

**survey:**
```
type         | name                       | label                           | Wiederholungsanzahl
------------ | -------------------------- | ------------------------------- | -------------------
integer      | Anzahl_Haushaltsmitglieder | Anzahl der Haushaltsmitglieder? |                    
begin_repeat | hh_member                  |                                 | $  
text         | name                       | name                            |                    
integer      | Alter                      | Alter                           |                    
end_repeat   |                            |                                 |                    
```

### Wiederholungen nur unter bestimmten Bedingungen hinzufügen

Wie [bei Gruppen](#überspringen) können alle Fragen in einer Wiederholung basierend auf einer bestimmten Bedingung übersprungen werden. Im folgenden Beispiel erhält die Person, die das Formular ausfüllt, nur dann die Möglichkeit, Kinder hinzuzufügen, wenn sie zuvor angibt, dass Kinder hinzuzufügen sind:

**survey:**
```
type              | name           | label                     | relevant           
----------------- | -------------- | ------------------------- | -------------------
select_one yes_no | hat_Kind       | Leben hier Kinder?        |                    
begin_repeat      | child_repeat   |                           | $ = 'ja'
text              | name           | Name des Kindes           |                    
decimal           | Geburtsgewicht | Geburtsgewicht des Kindes |                    
end_repeat        |                |                           |                    
```

**choices:**
```
list_name | name | label
--------- | ---- | -----
ja_nein   | ja   | Ja   
ja_nein   | nein | Nein 
```

### Darstellung von null Wiederholungen

Standardmäßig werden dem Ausfüllenden zunächst die Fragen für eine Wiederholung angezeigt, bevor er die Möglichkeit erhält, weitere hinzuzufügen. Um 0 Wiederholungen darzustellen, gibt es drei Möglichkeiten:

- Weisen Sie die Personen, die das Formular ausfüllen, an, die erste hinzugefügte Wiederholung zu löschen
- Wenn die genaue Anzahl der Wiederholungen im Voraus bekannt ist, [verwenden Sie eine dynamische Wiederholungsanzahl](#dynamische-wiederholungsanzahl)
- Wenn die genaue Anzahl der Wiederholungen nicht im Voraus bekannt ist, [verwenden Sie „relevant"](#wiederholungen-nur-unter-bestimmten-bedingungen-hinzufügen), um den Benutzer nur dann zur Eingabe von Wiederholungen aufzufordern, wenn welche hinzugefügt werden sollen */}

## Unterstützung mehrerer Sprachen

Es ist ganz einfach, ein Formular um mehrere Sprachen zu erweitern. Sie müssen lediglich Ihre **Beschriftungen** wie folgt benennen: **label::language1 (Code)**, **label::language2 (Code)** usw., und schon sind Ihre Formulare in mehreren Sprachen verfügbar. Siehe das folgende Beispiel. Wählen Sie im Pulldown-Menü der Datenerfassungsanwendung (dieses befindet sich möglicherweise unter der Menütaste) eine andere Formularsprache aus. Für das untenstehende Formular werden Englisch und Spanisch als mögliche Optionen angezeigt.

**survey:**
```
type    | name  | label::English (en) | label::Español (es) | constraint
------- | ----- | ------------------- | ------------------- | ----------
integer | Alter | Wie alt bist du?    | Wie alt bist du?    | . <= 150  
```

Du kannst auch verschiedene Sprachspalten für Hinweise und Mediendateien hinzufügen, indem du die `::language (Code)` Syntax verwendest. Siehe auch die [XLSForm-Referenz](https://xlsform.org/en/ref-table/), die eine Liste aller Spaltenüberschriften enthält, bei denen eine Sprachänderung vorgenommen werden kann.

**survey:**
```
hint::Englisch (en) | hint::Niederländisch (nl) | image::Englisch (en)   | image::Niederländisch (nl)
------------------- | ------------------------- | ---------------------- | --------------------------
ein Hinweis         | ein Hinweis               | old_person_cartoon.png | ouwe_strip.png            
```

Die Sprache des Formulars und die Sprache der Benutzeroberfläche können von der Anwendung separat festgelegt werden und stimmen möglicherweise nicht überein. Um (in Zukunft) eine Übereinstimmung beider Sprachen zu erleichtern, wird empfohlen – wenn auch optional –, einen zweistelligen Sprachcode hinter dem Sprachnamen anzufügen. Die offiziellen zweistelligen Sprachcodes, sogenannte *Subtags*, sind [hier](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) veröffentlicht (durchsuchen Sie die Seite mit Strg-F oder Cmd-F).

Wenn Ihr Formular mehrere Sprachen definiert und Sie eine Sprache für die Datenerfassung festlegen möchten, legen Sie eine explizite Standardsprache fest. Dies geschieht im Einstellungsblatt des XLSForms, indem Sie die Sprache in der Spalte **„default_language"** angeben. Im folgenden Beispiel ist die Standardsprache Französisch.

**settings:**
```
form_id   | version | default_language
--------- | ------- | ----------------
test_form | 101     | French (fr)     
```

## Standard (Default)

Das Hinzufügen eines Standardfelds bedeutet, dass eine Frage beim ersten Anzeigen für den Benutzer bereits mit einer Antwort vorbelegt ist. Dies kann Zeit sparen, wenn es sich um eine häufig ausgewählte Antwort handelt, oder dem Benutzer zeigen, welche Art von Antwort erwartet wird. Siehe das Beispiel unten.

**survey:**
```
type    | name         | label                          | default   
------- | ------------ | ------------------------------ | ----------
date    | Umfragedatum | Erhebungsdatum?                | 15.06.2010
decimal | Gewicht      | Gewicht des Befragten? (in kg) | 51,3      
```

Der Befragte kann die Antwort ganz einfach ändern, indem er auf das Antwortfeld tippt und eine andere Antwort eingibt.

Sie können auch eine Standardberechnung hinzufügen, die nur einmal berechnet wird, wenn das Formular geladen wird oder – falls sich die Frage innerhalb einer [Wiederholung](#wiederholungen) befindet – wenn die Wiederholung hinzugefügt wird.

**survey:**
```
type | name | label                                                   | default
---- | ---- | ------------------------------------------------------- | -------
date | d    | Geben Sie das Datum ein, an dem das Ereignis stattfand? | today()
```

## Darstellung

In der Spalte **appearance** können Sie das Erscheinungsbild der Fragen in Ihrem Formular ändern. Die folgende Tabelle listet die möglichen Darstellungsattribute auf und zeigt, wie die Frage im Formular angezeigt wird.

Erscheinungsbild-Attribut      | Fragetyp                     | Beschreibung                                                                                     |
|--------------------------------|------------------------------|-------------------------------------------------------------------------------------------------|
| multiline                      | text                         | Am besten für Webclients geeignet, macht das Textfeld mehrere Zeilen lang.                     |
| minimal                        | select_one, select_multiple | Antwortmöglichkeiten erscheinen in einem Dropdown-Menü.                                      |
| quick                          | select_one                  | Nur für mobile Clients relevant, springt automatisch zur nächsten Frage nach Auswahl einer Antwort. |
| no-calendar                   | date                         | Nur für mobile Geräte, unterdrückt die Kalenderanzeige.                                         |
| month-year                     | date                         | Ermöglicht die Auswahl von Monat und Jahr für das Datum.                                        |
| year                           | date                         | Ermöglicht die Auswahl nur eines Jahres für das Datum.                                           |
| horizontal-compact             | select_one, select_multiple | Nur für Webclients, zeigt Antwortmöglichkeiten horizontal an.                                 |
| horizontal                     | select_one, select_multiple | Nur für Webclients, zeigt Antwortmöglichkeiten horizontal in Spalten an.                       |
| likert                         | select_one                  | Am besten für Webclients geeignet, zeigt Antwortmöglichkeiten als Likert-Skala an.             |
| compact                        | select_one, select_multiple | Zeigt Antwortmöglichkeiten nebeneinander mit minimalem Abstand und ohne Radiobuttons oder Checkboxen an. Besonders nützlich bei Bildauswahlen. |
| quickcompact                   | select_one                  | Wie vorher, springt aber automatisch zur nächsten Frage (nur für mobile Clients).               |
| field-list                     | groups                      | Die gesamte Gruppe von Fragen erscheint auf einem Bildschirm (nur für mobile Clients).        |
| label                          | select_one, select_multiple | Zeigt die Beschriftungen der Antwortmöglichkeiten an (nicht die Eingabefelder).                |
| list-nolabel                   | select_one, select_multiple | Wird in Kombination mit dem Label-Attribut verwendet, zeigt die Antwort-Eingabefelder ohne Beschriftungen an (bei mobilen Clients die Felder label und list-nolabel in eine Gruppe mit dem Attribut field-list setzen). |
| table-list                     | groups                      | Einfacherer Weg, um das gleiche Erscheinungsbild wie oben zu erreichen; wende dieses Attribut auf die gesamte Gruppe von Fragen an (kann das Formular etwas verlangsamen). |
| signature                      | image                       | Ermöglicht das Zeichnen einer Unterschrift in das Formular (nur für mobile Clients).            |
| draw                           | image                       | Ermöglicht das Skizzieren einer Zeichnung mit dem Finger auf dem Bildschirm des mobilen Geräts. |
| map, quick map                 | select_one, select_one_from_file | Ermöglicht die Auswahl einer Option aus vielen Merkmalen auf einer Karte.                     |

Eine XLSForm mit allen Darstellungsattributen in dieser Tabelle ist [hier](https://docs.google.com/spreadsheets/d/1af_Sl8A_L8_EULbhRLHVl8OclCfco09Hq2tqb9CslwQ) verfügbar.

## Einstellungs-Arbeitsblatt

Das Einstellungs-Arbeitsblatt ist optional, es wird jedoch dringend empfohlen, zumindest **„form_title"**, **„form_id"** und **„version"** anzugeben. Mit weiteren Einstellungen können Sie Ihr Formular noch individueller anpassen, beispielsweise durch Festlegen eines allgemeinen Stilthemas oder durch Verschlüsseln Ihrer Datensätze.

Nachfolgend finden Sie ein Beispiel für ein Einstellungsblatt:

**settings:**
```
form_title | form_id | version    | instance_name                        | default_language | public_key  
---------- | ------- | ---------- | ------------------------------------ | ---------------- | ------------
Beispiel   | ex_id   | 2017021501 | concat($, ' ', $) | English (en)     | IIBIjANBg...
```

Die verfügbaren Spaltenüberschriften für die Einstellungen sind:

- **form_title**: Der Titel des Formulars, der den Benutzern angezeigt wird. Der Formulartitel wird aus **form_id** übernommen, wenn **form_title** leer ist oder fehlt.
- **form_id**: Der Name, der zur eindeutigen Identifizierung des Formulars auf dem Server verwendet wird. Die Formular-ID wird aus dem Namen der XLS-Datei übernommen, wenn **form_id** leer ist oder fehlt.
- **version**: Zeichenfolge, die diese Version angibt. Eine gängige Konvention ist die Verwendung von Zeichenfolgen im Format „yyyymmddrr". Beispielsweise steht 2017021501 für die erste Überarbeitung vom 15. Februar 2017.
- **instance_name**: Ausdruck, der Formularfelder verwendet, um jede Formularübermittlung zu identifizieren. [Weitere Informationen](#geben-sie-den-namen-der-formularübermittlung-an).
- **default_language**: In lokalisierten Formularen legt dies fest, welche Sprache als Standard verwendet werden soll. Es sollte dasselbe Format wie beim [Hinzufügen von Übersetzungen](#unterstützung-mehrerer-sprachen) verwendet werden, einschließlich des Sprachcodes.
- **public_key**: Bei Formularen mit Verschlüsselung wird hier der öffentliche Schlüssel eingefügt. [Weitere Informationen](#verschlüsselte-formulare).
- **submission_url**: Diese URL kann verwendet werden, um den Standard-Server zu überschreiben, an die abgeschlossene Datensätze übermittelt werden sollen. [Mehr erfahren](#geben-sie-einen-alternativen-server-an).
- **style**: Geben Sie für Webformulare den Formularstil an. [Weitere Informationen](#formulare-mit-mehreren-webseiten).
- **name**: Name des XForms-Stammknotens. Dies ist selten erforderlich, [mehr erfahren](#geben-sie-den-namen-des-xforms-stammknotens-an).
- **clean_text_values**: Diese Spalte kann verwendet werden, wenn `ja` oder `nein` um zu steuern, ob Leerzeichen im das Umfrageformular ausgeblendet ist (Standardwert ist „ja").

### Umfragen mit mehreren Seiten

Webformulare können mithilfe des Stils „Theme **Pages**" auf mehrere Seiten aufgeteilt werden.

Ein Beispiel für ein Formular, das auf mehrere Seiten aufgeteilt ist, finden Sie im Webformular [„Widgets auf Seiten"](https://enketo.ona.io/x/#YjeC). Erstellen Sie auf der Registerkarte **„Einstellungen"** eine Spalte mit dem Namen **„Stil"** und legen Sie diese wie folgt auf **„Seiten"** fest:

**settings:**
```
form_title    | form_id     | style 
------------- | ----------- | ------
Beispieltitel | Beispiel-ID | Seiten
```

Gruppieren Sie auf der Registerkarte **„Umfrage"** die Fragen, die auf jeder Seite erscheinen sollen, und legen Sie dann die Darstellung der Gruppe auf **„Feldliste"** fest. Siehe das folgende Beispiel.

**survey:**
```
type        | name    | label                 | appearance      
----------- | ------- | --------------------- | ----------------
type        | name    | label                 | Erscheinungsbild
begin_group | Gruppe1 |                       | Feldliste       
text        | name    | Name des Befragten    |                 
integer     | Alter   | Alter des Befragten   |                 
text        | Adresse | Adresse des Befragten |                 
Endgruppe   |         |                       |                 
```

Weitere Informationen zum Erstellen mehrseitiger Webformulare finden Sie in diesem [Blogbeitrag](http://blog.enketo.org/pages/). Den Quellcode für XLSForm finden Sie [hier](https://docs.google.com/spreadsheets/d/1yZqG2Xt0I4duVxPqx-Sny0t86OiKtjHuBKXTRzCht6E/edit?usp=sharing).

### Umfragen im Raster-Design

Der Grid-Stil ermöglicht es Ihrem Formular, das Aussehen traditioneller Papierfragebögen nachzuahmen, indem mehrere Fragen in einer Zeile zusammengefasst werden. Dieser Stil eignet sich am besten für größere Bildschirme (z. B. Computer oder Tablets). Außerdem lässt er sich gut ausdrucken!

Bitte klicken Sie auf den Link, um ein Beispiel für ein [Webformular im Grid-Design](https://enketo.ona.io/x/#Yn4R) zu sehen.

Um ein Formular im Raster-Stil zu erstellen, geben Sie auf der Registerkarte **„Einstellungen"** in der Spalte **„Stil"** wie folgt **„theme-grid"** ein:

**settings:**
```
form_title    | form_id     | style       
------------- | ----------- | ------------
Beispieltitel | Beispiel-ID | Theme-Raster
```

Gruppieren Sie auf der Registerkarte **„Umfrage"** die Fragen, die in den einzelnen Abschnitten erscheinen sollen, und legen Sie dann die Darstellung für jedes Feld entsprechend der gewünschten Breite fest (die Standardbreite ist 4). Siehe das folgende Beispiel.

**survey:**
```
type        | name    | label                 | appearance
----------- | ------- | --------------------- | ----------
begin_group | Gruppe1 |                       |           
text        | name    | Name des Befragten    | w3        
integer     | Alter   | Alter des Befragten   | w1        
text        | Adresse | Adresse des Befragten | w4        
Endgruppe   |         |                       |           
```

Weitere Informationen zum Erstellen von Grid-Formularen finden Sie in diesem [Blogbeitrag](http://blog.enketo.org/gorgeous-grid/). Das XLSForm-Beispiel für das Grid-Theme finden Sie [hier](https://docs.google.com/spreadsheets/d/1Z4gHZQTr5FibRK-Aj198WlNdMZghEBZlyWhmPZXjzJQ/edit?usp=sharing).

         
```

Das Einstellungsblatt unterstützt ein 1-spaltiges Präfix (**attribute::**), das der XForm-Ausgabe im Hauptinstanzelement (standardmäßig `data` genannt) Attribute hinzufügt. Das folgende Beispiel würde in der XForm-Ausgabe beispielsweise wie folgt erscheinen: `<data id="my_form" xyz="1234"/>`.

**settings:**
```
title         | attribute::xyz
------------- | --------------
Mein Formular | 1234          
```

Wie bei den oben genannten Umfragespalten kann die Einstellung **„attribute::"** mit der Einstellung **„namespaces"** kombiniert werden, um ein Attribut mit Namensraum hinzuzufügen. Das folgende Beispiel würde beispielsweise in der XForm-Ausgabe wie folgt erscheinen: `<data id="my_form" abc:xyz="1234"/>`.

**settings:**
```
title         | attribute::abc:xyz
------------- | ------------------
Mein Formular | 1234              
``` */}

## Tools, die XLSForms unterstützen

- [Ona](https://ona.io)
- [Enketo](https://enketo.org)
- [ODK](https://getodk.org)
- [KoBoToolBox](https://kobotoolbox.org)
- [CommCare](https://commcarehq.org)
- [SurveyCTO](https://www.surveycto.com)
- [Secure Data Kit (SDK)](http://www.securedatakit.com)
- [Survey123 für ArcGIS](https://survey123.arcgis.com)
- [Community Health Toolkit](https://communityhealthtoolkit.org)
- [CyberTracker](https://cybertrackerwiki.org/xlsform)

## Anhang – Laden großer CSV-Dateien

> **Warnung:** In diesem Abschnitt werden weniger allgemeine Alternativen zu [`select_one_from_file`](#mehrfachauswahl-aus-datei) und der [Instanzfunktion](#werte-in-auswahllisten-oder-angehängten-dateien-nachschlagen) beschrieben. Diese sind in einigen Tools, die das Ausfüllen von XLSForms ermöglichen, möglicherweise leistungsfähiger, funktionieren jedoch in anderen möglicherweise nicht.

### Vorladen von Daten

Das Vorladen von Daten erfolgt, wenn man in einem Umfrageformular auf bereits vorhandene Daten verweisen möchte. Sie können in Ihrem Umfrageformular (der Umfrage, die Sie gerade erstellen) auf Daten aus einem bestimmten Umfrageformular oder aus einer beliebigen anderen Quelle verweisen. Wenn Sie beispielsweise bereits über Daten aus einer Haushaltsbefragung verfügen und Folgedaten über die Haushaltsmitglieder erfassen möchten, können Sie in Ihrem Umfrageformular auf die Daten der Haushaltsbefragung verweisen.

So verweisen Sie in einem Umfrageformular auf bereits vorhandene Daten:

- Laden Sie beim Hochladen Ihrer Formulardefinition eine oder mehrere CSV-Dateien als Begleitdateien hoch (genauso, wie Sie Begleitdateien für Medien hochladen, wie im Abschnitt [„Medien"](#medien) beschrieben). Die erste Zeile jeder CSV-Datei sollte eine Kopfzeile enthalten, die kurze,
- eindeutige Namen für jede Spalte
- die folgenden Zeilen, die die Daten selbst enthalten sollten

Jede CSV-Datei sollte mindestens eine Spalte enthalten, anhand derer jede Zeile eindeutig identifiziert werden kann. Diese Spalten werden zum Zeitpunkt der Umfrage verwendet, um nachzuschlagen, welche Zeilendaten in die Umfrage übernommen werden sollen. Fügen Sie bei den Spalten, die zum Nachschlagen von Zeilen verwendet werden sollen, in der ersten Zeile **„_key"** an das Ende des Spaltennamens an. Alle Spalten, deren Namen auf **„_key"** enden, werden für schnellere Abfragen auf Ihren Umfragegeräten indiziert.

| name_key | name |
|---|---|
| mango | Mango |
| orange | Orange |

### So rufen Sie Daten aus einer CSV-Datei ab

> **Warnung:** Wenn Sie `select_one_from_file` verwenden, um Auswahloptionen aus einer Datei anzuzeigen, sollten Sie generell die `instance`-Funktion verwenden, um Werte in dieser Datei nachzuschlagen, anstatt `pulldata`.

Sie können Daten aus einer CSV-Datei abrufen, indem Sie während der Umfrage eine oder mehrere CSV-Dateien in Ihr Formular einbinden. Für jedes Datenfeld, das Sie in Ihre Umfrage einbinden möchten:

- **F**ügen Sie Ihrer Umfrage ein **Berechnungsfeld** hinzu.
- Geben Sie diesem Feld einen **Namen**
- Rufen Sie dann in der Berechnungsspalte die Funktion `pulldata()` auf und geben Sie an, welches Feld aus welcher Zeile welcher CSV-Datei abgerufen werden soll.

Ein Beispiel finden Sie unten:

**survey:**
```
type      | name       | label                                                  | calculation                                  
--------- | ---------- | ------------------------------------------------------ | ---------------------------------------------
calculate | Obst       |                                                        | pulldata('Obst', 'name', 'name_key', 'Mango')
note      | note_fruit | Die Frucht $ wurde aus der CSV-Datei abgerufen. |                                              
```

Sobald Sie mit der Funktion **pulldata()** CSV-Daten in ein Umfragefeld geladen haben, können Sie in späteren Relevanzbedingungen, Einschränkungen und Beschriftungen auf dieses Feld verweisen, genau wie Sie auf jedes andere Feld verweisen würden, das vom Benutzer ausgefüllt wurde.

Klicken Sie auf den Link, um ein Beispiel für ein [vorbelegtes Formular](https://docs.google.com/spreadsheets/d/1evieF8RW8CMlhbhksgfikXAYvK6uXh3DS5c50ejTSEw/edit?usp=sharing) zu sehen. Die mit dem Formular verwendete CSV-Datei finden Sie [hier](https://docs.google.com/spreadsheets/d/1gprb7ocTYlT_seOBFY5CuoxyodcXwWOuVxmp38OX1dE/edit?usp=sharing).

### Wichtige Hinweise zur Verwendung vorbelegter Daten

- Speichern Sie die CSV-Datei im **UTF-8-Format**, wenn die vorab geladenen Daten nicht-englische Schriftarten oder Sonderzeichen enthalten. Dadurch kann Ihr Android-Gerät den Text korrekt darstellen.
- Aus einer CSV-Datei geladene Datenfelder werden als Textzeichenfolgen behandelt; verwende daher die Funktionen **int()** oder **number()**, um ein vorab geladenes Feld in numerische Form zu konvertieren.
- Wenn die CSV-Datei sensible Daten enthält, die Sie möglicherweise nicht auf den Server hochladen möchten, laden Sie eine leere CSV-Datei als Teil Ihres Formulars hoch und ersetzen Sie diese anschließend durch die eigentliche CSV-Datei, indem Sie die Datei manuell auf jedes Ihrer Geräte kopieren.

### Dynamische Auswahl aus vorab geladenen Daten

> **Warnung:** Verwenden Sie [`select_one_from_file`](#mehrfachauswahl-aus-datei), es sei denn, Sie benötigen mehr als 50.000 Optionen oder erfassen Daten auf alten oder leistungsschwachen Geräten. Dieser Ansatz wird von Enketo-Webformularen nicht unterstützt.

Sobald Ihr Formular über eine oder mehrere vorab geladene CSV-Dateien verfügt, können Sie die Auswahllisten für **„select_one"**- und „select_multiple"-Felder dynamisch aus diesen CSV-Dateien abrufen. Mehrfachauswahlfelder mit dynamischen Auswahllisten folgen derselben allgemeinen Syntax wie reguläre, statische „select_one"- und „select_multiple"-Felder, wie zuvor im Abschnitt [„Mehrfachauswahl"](#mehrfachauswahl) erläutert.

Führen Sie Folgendes aus:

- Geben Sie **„select_one listname"** oder **„select_multiple listname"** in der Spalte „type" an (wobei **„listname"** der Name Ihrer Auswahlliste ist)
- Geben Sie etwaige spezielle **Darstellungsstile** in der Spalte „appearance" an
- Fügen Sie eine oder mehrere Zeilen für Ihren listname in das Arbeitsblatt „choices" ein.

Nachfolgend finden Sie ein Beispiel für das **Umfrageformular**:

**survey:**
```
type               | name    | label                 | appearance    
------------------ | ------- | --------------------- | --------------
select_one Früchte | Früchte | Wähle eine Frucht aus | search('Obst')
```

Es gibt drei Unterschiede, wenn die Auswahlliste aus einer Ihrer vorab geladenen CSV-Dateien abgerufen werden soll:

- In der Spalte „Darstellung":
  - Fügen Sie einen **search()-Ausdruck** ein, der angibt, welche CSV-Zeilen in die Auswahlliste aufgenommen werden sollen.
  - Wenn für das Feld ein vom Standard abweichender Darstellungsstil verwendet werden soll. Der vom Standard abweichende Darstellungsstil wird zuerst in die Spalte eingegeben, gefolgt von einem **Leerzeichen** und anschließend dem **Ausdruck „search()"**. [z. B. „quick search()"]
- Im Arbeitsblatt „Auswahlmöglichkeiten":
  - sollte eine Zeile angeben, welche CSV-Spalten für die Bezeichnung und den ausgewählten Wert verwendet werden sollen. Wie folgt:
    - Spalte **„list_name"**: Geben Sie den Namen Ihrer Auswahlliste wie gewohnt an.
    - Spalte **„name"**: Geben Sie den Namen der CSV-Spalte an, die zur eindeutigen Identifizierung der ausgewählten Optionen verwendet werden soll.
    - Bezeichnungsspalte: Geben Sie den Namen der CSV-Spalte an, die zur Beschriftung der Auswahlmöglichkeiten verwendet werden soll.

    **Hinweis:** Wenn Sie mehrere Spalten in die Beschriftungen aufnehmen möchten, geben Sie eine durch Kommas getrennte Liste aller einzubeziehenden Spalten an. Die Namensspalte wird dynamisch anhand des dort angegebenen Spaltennamens ausgefüllt, und die Beschriftungsspalte wird dynamisch anhand der dort angegebenen Spaltennamen ausgefüllt.

  - In der Zeile „Auswahlmöglichkeiten" Ihres Arbeitsblatts können Sie in der Spalte „Bild" auch einen Spaltennamen aus einer CSV-Datei angeben. In diesem Fall wird der zu verwendende Bilddateiname aus der angegebenen CSV-Spalte übernommen.

    **Hinweis:** Wenn Sie auf diese Weise auf Bilddateien verweisen, müssen Sie diese Bilddateien immer als Mediendateianhänge hochladen, wenn Sie Ihr Formular auf den Server hochladen.

**choices:**
```
list_name | name       | label
--------- | ---------- | -----
Obst      |  	name_key | name 
```

Klicken Sie auf den Link, um ein Beispiel für ein [Such- und Auswahlformular](https://docs.google.com/spreadsheets/d/1Y0vW0cjl1nbkZczXRmcTC71Pso8dRbouPSYWGBdvBWU/edit?usp=sharing) anzuzeigen. Die mit dem Formular verwendete CSV-Datei finden Sie [hier](https://docs.google.com/spreadsheets/d/1gprb7ocTYlT_seOBFY5CuoxyodcXwWOuVxmp38OX1dE/edit?usp=sharing).

Für den **Ausdruck search()** gibt es eine Reihe von Optionen, um anzugeben, welche CSV-Zeilen in die Auswahlliste aufgenommen werden sollen:

1. **search(csvName)**: Der Suchausdruck mit einem einzigen Parameter umfasst alle eindeutigen Zeilen als Auswahlmöglichkeiten (z. B. „search('hhplotdata')"). Alle Zeilen in der angegebenen CSV-Datei werden als Auswahlmöglichkeiten berücksichtigt, aber nur eindeutige Zeilen – also solche mit eindeutigen Auswahldaten – werden dem Benutzer angezeigt. Mit anderen Worten: Duplikate werden automatisch aus der dem Benutzer angezeigten Liste herausgefiltert.

2. **search(csvName, „contains", columnsToSearch, searchText)**: Dieser Suchausdruck umfasst alle eindeutigen Zeilen, die den angegebenen Text in der/den angegebenen Spalte(n) enthalten (z. B. `search('hhplotdata', 'contains', 'respondentname', $)`). Der dritte Parameter gibt entweder einen einzelnen Spaltennamen für die Suche oder eine durch Kommas getrennte Liste von Spaltennamen an. Es werden alle Zeilen einbezogen, die in einer der angegebenen Spalten Übereinstimmungen aufweisen.

3. **search(csvName, „startswith", columnsToSearch, searchText)**: Dieser Suchausdruck umfasst alle eindeutigen Zeilen, die in der/den angegebenen Spalte(n) mit dem angegebenen Text beginnen (z. B. `search('hhplotdata', 'startswith', 'respondentname', $)`). Der dritte Parameter gibt entweder einen einzelnen Spaltennamen für die Suche oder eine durch Kommas getrennte Liste von Spaltennamen für die Suche an. Es werden alle Zeilen berücksichtigt, die in einer der angegebenen Spalten Übereinstimmungen enthalten.

4. **search(csvName, „endswith", columnsToSearch, searchText)**: Dieser Suchausdruck umfasst alle eindeutigen Zeilen, die in der/den angegebenen Spalte(n) mit dem angegebenen Text enden (z. B. `search('hhplotdata', 'endswith', 'respondentname', $)`). Der dritte Parameter gibt entweder einen einzelnen Spaltennamen für die Suche oder eine durch Kommas getrennte Liste von Spaltennamen für die Suche an. Zeilen mit Übereinstimmungen in einer der angegebenen Spalten werden einbezogen.

5. **search(csvName, „matches", columnsToSearch, searchText)**: Dieser Suchausdruck umfasst alle eindeutigen Zeilen, die den angegebenen Text in der/den angegebenen Spalte(n) exakt enthalten (z. B. `search('hhplotdata', 'matches', 'respondentname', $)`). Der dritte Parameter gibt entweder einen einzelnen Spaltennamen für die Suche oder eine durch Kommas getrennte Liste von Spaltennamen an. Zeilen mit exakten Übereinstimmungen in einer der angegebenen Spalten werden einbezogen.

6. **search(csvName, searchType, columnsToSearch, searchText, columnToFilter, filterText)**: Schließlich kann jeder der vier oben genannten Suchtypen weiter gefiltert werden, um nur eine Teilmenge der CSV-Daten einzubeziehen. Fügen Sie einfach zwei zusätzliche Parameter zu einem der oben genannten Suchtypen hinzu, wobei der erste zusätzliche Parameter der zu filternde Spaltenname und der zweite zusätzliche Parameter der genaue zu filternde Wert ist. Unabhängig davon, welche Suche in den ersten vier Parametern angegeben ist, werden nur Zeilen berücksichtigt, die den Wert des sechsten Parameters in der durch den fünften Parameter benannten Spalte genau enthalten (z. B. `search('hhplotdata', 'contains', 'respondentname', $, 'villageid', $)`, um alle übereinstimmenden Namen innerhalb eines bestimmten Dorfes aufzulisten).

Zusätzliche Hinweise zur Verwendung:

1. Die Auswahlmöglichkeiten werden standardmäßig in der Reihenfolge sortiert, in der sie in Ihrer CSV-Datei erscheinen. Wenn Sie eine andere Reihenfolge festlegen möchten, fügen Sie in Ihrer CSV-Datei eine numerische Spalte mit dem Namen „sortby" ein; die Auswahlmöglichkeiten werden dann numerisch entsprechend der „sortby"-Spalte sortiert (sofern vorhanden).

2. Sie können zusätzlich zu den dynamischen Optionen, die aus Ihrer CSV-Datei geladen werden, eine oder mehrere statische Auswahloptionen einfügen. Fügen Sie die statischen Optionen einfach wie gewohnt in das Arbeitsblatt „choices" ein. Diese können vor und/oder nach der Zeile erscheinen, die die Spalten angibt, die für Ihre dynamischen Optionen verwendet werden sollen. Die einzige Einschränkung besteht darin, dass die Werte, die Sie für Ihre statischen Optionen in der Spalte „name" angeben, numerisch sein müssen.

### Datenbankgestützte „schnelle externe Itemsets"

> **Warnung:** Wir empfehlen generell die Verwendung von [`select_one_from_file`](#mehrfachauswahl-aus-datei), es sei denn, Sie benötigen mehr als 50.000 Zeilen oder sehr alte Geräte. Dieser Ansatz wird von Enketo-Webformularen nicht unterstützt.

Das Aktivieren externer Auswahlfelder ist unkompliziert.

- Verwenden Sie statt **„select_one"** für den Prompt-Typ **„select_one_external"**.
- Anstelle des „choices"-Blattes fügen Sie externe Auswahlmöglichkeiten in das **„external_choices"**-Blatt ein.

Ein Beispiel für die Verwendung von normalen und externen Auswahlmöglichkeiten finden Sie im Formular [„select_one_external"](https://docs.google.com/spreadsheets/d/12qZL34kuHSZGWDv0BBJ1qf7dSmml-d2VnMWH0Vtg-O4/edit?usp=sharing).

Wenn eine XLSForm mit externen Auswahlmöglichkeiten in ein XForm konvertiert wird, werden zwei Dateien erstellt: das **XForm** (z. B. form-filename.xml) mit allen normalen Auswahlmöglichkeiten und eine Datei **„itemsets.csv"** mit den externen Auswahlmöglichkeiten.

Die Datei **itemsets.csv** kann als Mediendatei auf jeden ODK-kompatiblen Server (z. B. ODK Aggregate) hochgeladen werden. Sie wird wie jede andere Mediendatei auf jeden ODK-kompatiblen Client (z. B. ODK Collect) heruntergeladen und im Ordner [Formular-Dateiname]-media gespeichert. Clients wie ODK Collect laden Mediendateien von der SD-Karte, sodass Ihr Formular mit einer großen Anzahl von Auswahlmöglichkeiten nun sehr schnell geladen wird.

## Weitere Ressourcen

Wenn Sie sich eingehender mit XForms befassen und über die Informationen zu XLSForms auf dieser Website hinausgehen möchten, finden Sie hier einige Ressourcen:

- [XForms, wie sie vom ODK-Ökosystem unterstützt werden](https://getodk.github.io/xforms-spec/)
- [ODK-Richtlinien zum Formular-Design](https://docs.getodk.org/form-design-intro/)
- [Übersicht über das Formular-Design in Ona](https://help.ona.io/knowledge-base/guide-creating-surveys/)
- [KoBoToolbox-Hilfezentrum für Formularentwurf](https://support.kobotoolbox.org/getting_started_xlsform.html)

## Über diese Website

XLSForm.org ist ein von der Community getragenes Projekt, dessen Ziel es ist, eine gemeinsame Referenz für den XLSForm-Standard zu schaffen.

Wenn Sie zu dieser Dokumentation beitragen oder sie verbessern möchten, besuchen Sie bitte [das GitHub-Repo](https://github.com/XLSForm/xlsform.github.io) unseres Projekts.

## Geschichte

XLSForm wurde ursprünglich von Andrew Marder und Alex Dorey vom [Sustainable Engineering Lab der Columbia University](http://sel.columbia.edu) entwickelt. Als XLSForms von der ODK-Community übernommen wurden, arbeitete SEL mit dem ODK-Team zusammen, um die aktuelle Spezifikation zu entwickeln. [PyXForm](https://github.com/XLSForm/pyxform), die Bibliothek zur Konvertierung von XLSForms in XForms, ist ein Open-Source-Projekt, das von Mitgliedern von ODK, Ona, SurveyCTO und KoBoToolbox unterstützt wird.

---

# Antworttypen

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

Bei Single-Choice-Fragen ist ein „Sonstiges (bitte angeben)"-Feld nur dann gerechtfertigt, wenn das erhobene Merkmal einen offenen Wertebereich hat, der sich nicht vollständig vorspezifizieren lässt — etwa Geschlecht, Berufsbezeichnung oder Religionszugehörigkeit. Bei Merkmalen mit klar begrenztem Wertebereich (z. B. Altersgruppe, Bildungsabschluss, Beschäftigungsstatus) sollte auf das Feld verzichtet werden, da die Kategorien so formuliert werden können, dass sie erschöpfend und trennscharf sind [Citation].

#### Layout

**XLSForm survey:**
```
type              | name             | label                                               | relevance              
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
type                    | name                | label                              | relevance                 
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

## Weitere Antwortformate

### Endpunkt-verankerte Ratingskalen

Endpunkt-verankerte Ratingskalen verwenden eine numerische Skala, bei der nur die Endpunkte (und ggf. der Mittelpunkt) verbal beschriftet sind. Im Gegensatz zu Likert-Batterien, bei denen jeder Skalenpunkt eine verbale Kategorie trägt und mehrere Items zu einem Gesamtwert aggregiert werden, sind endpunkt-verankerte Skalen typischerweise Einzelitem-Maße: Der einzelne Zahlenwert ist die interessierende Variable. Gängige Formate sind Feeling Thermometer (0–100), Cantril-Leiter (0–10), NPS-Skala (0–10), Schulnoten-Skala (1–6) und Wahrscheinlichkeitseinschätzungen (0–100%).

### Semantisches Differential

Semantische Differentiale präsentieren zwei gegensätzliche Adjektive (z.B. „modern – traditionell") an den Enden einer typischerweise 5- oder 7-stufigen Skala. Befragte verorten sich zwischen den Polen. Das Format wird häufig in der Marken- und Einstellungsforschung eingesetzt.

### Ranking

Ranking-Fragen fordern Befragte auf, eine Menge von Items in eine Reihenfolge zu bringen (z.B. nach Wichtigkeit). Sie erzwingen Differenzierung — im Gegensatz zu Ratingskalen, bei denen alle Items gleich bewertet werden können. Ranking-Daten sind jedoch ipsativ (die Ränge sind nicht unabhängig voneinander), was die anwendbaren statistischen Verfahren einschränkt. Ab etwa 5–7 Items steigt die kognitive Belastung deutlich, und die Datenqualität sinkt.

### Datum / Uhrzeit

Datums- und Uhrzeitfragen erfassen temporale Angaben direkt (z.B. Geburtsdatum, Zeitpunkt eines Ereignisses). In XLSForm entspricht dies den Typen `date` und `time`. Zentrale Designentscheidungen betreffen das Eingabeformat (DD.MM.YYYY vs. Datepicker) und die Mobilfreundlichkeit der gewählten Eingabemethode.

## Weitere Empfehlungen für Antwortformate

### „Weiß nicht" und „Keine Angabe"

Eine explizite „Weiß nicht"-Option erhöht den Anteil fehlender Antworten, ohne die Reliabilität zu verbessern. Der Anstieg ist nur teilweise auf echte Meinungslosigkeit zurückzuführen — die Option wird auch als Satisficing-Strategie genutzt und kann suggerieren, dass Expertenwissen zur Beantwortung nötig sei. Ihr Einsatz ist daher kritisch zu sehen (Baur et al., 2014). 

**„Keine Angabe" / „Möchte ich nicht beantworten"** ist konzeptionell von „Weiß nicht" zu trennen: Hier wird nicht Unfähigkeit signalisiert, sondern bewusste Antwortverweigerung. Diese Option sollte bei sensiblen Themen angeboten werden — also bei Fragen, die soziale Erwünschtheit auslösen, als intrusiv empfunden werden oder bei denen Befragte negative Konsequenzen einer Offenlegung befürchten (Tourangeau & Yan, 2007). Typische Anwendungsbereiche sind Einkommen, Gesundheit, Sexualität und politische Zugehörigkeit. Wird bei solchen Fragen stattdessen eine Antwort erzwungen (Forced Answering), steigen die Abbruchquoten — insbesondere bei hochsensiblen Items — und die Antwortqualität sinkt (Décieux et al., 2015).

Bei **Multiple-Choice-Fragen** sollten "Weiß nicht" und "Keine Angabe" als exklusive Optionen implementiert werden: Sobald eine inhaltliche Option gewählt wird, ist eine gleichzeitige Angabe von „Weiß nicht" logisch widersprüchlich und sollte technisch unterbunden werden.

In XLSForm wird die Exklusivität einer Option über die Spalte `exclusive` in der choices-Tabelle gesteuert:

**survey:**
```
type                            | name            | label                                         
------------------------------- | --------------- | ----------------------------------------------
select_multiple angebotsnutzung | angebotsnutzung | Welche Angebote Ihrer Organisation nutzen Sie?
```

**choices:**
```
list_name       | name         | label            | exclusive
--------------- | ------------ | ---------------- | ---------
angebotsnutzung | beratung     | Beratung         |          
angebotsnutzung | bildung      | Bildungsangebote |          
angebotsnutzung | freizeit     | Freizeitangebote |          
angebotsnutzung | keine_angabe | Keine Angabe     | yes      
```

##  Nicht empfohlene Antwortformate

Schieberegler/Slider sollten zugunsten von Radio Buttons vermieden werden. Sie benötigen mehr Zeit zum Ausfüllen, führen zu mehr fehlenden Daten (Funke, 2016) und sind insbesondere auf Mobilgeräten problematisch (Antoun et al., 2017). Entscheidend ist, dass sie keine zuverlässigen kontinuierlichen Daten liefern, denn ein Schieberegler von 0 bis 100 täuscht Präzision nur vor. Radio Buttons sind schneller, besser zugänglich und funktionieren auf allen Geräten gleich.

---

# Fragen formulieren

Bei der Formulierung von Fragebogenfragen gelten nach Porst et al. (2019) folgende Regeln:

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

> **Praxisbeispiel:**
> Die Frage *„Wie gut arbeitet Ihre Organisation im Moment mit der Stadt oder dem Landkreis zusammen?"* ist ein klassischer **doppelter Stimulus** (Regel 4): Sie fragt gleichzeitig, *ob* eine Zusammenarbeit stattfindet, und *wie gut* diese läuft. Das Problem zeigt sich an den Antwortoptionen — neben einer Bewertungsskala (z.B. „eher gut") bräuchte man zusätzlich die Option „es gibt keine Zusammenarbeit", was die Skala sprengt.
> 
> Besser wäre eine vorgelagerte Filterfrage (*„Arbeitet Ihre Organisation mit der Stadt oder dem Landkreis zusammen?"*). Nur bei Ja folgt dann die Folgefrage zur Qualität der Zusammenarbeit. [Hier](https://example.com) findert ihr dieses Beispiel in unserer Fragendatenbank.

Eine gute Anleitung des Ministeriums für Digitales mit den häufigsten Fehlern beim Formulieren von Fragen und Beispielen wie man es besser machen kann findet ihr [hier](https://servicestandard.gov.de/handbuch/anleitungen/formulare-mit-verstaendlichen-fragen-gestalten/).

---

# Fragebogenaufbau

## Antwortverzerrungen

### Reihenfolgeeffekte

Warum die Position einer Frage das Antwortverhalten beeinflussen kann.

## Fragebogenlogik

Skip Logic, Branching und Filterführung.

> **Praxisbeispiel:**
> Man möchte erfassen, ob Organisationen Auswirkungen des Inkrafttretens eines Gesetzes beobachten. Bevor man fragt, ob dies der Fall ist, sollte man zunächst filtern, ob Organisationen dieses Gesetz überhaupt kennen. Sonst beantworten alle Befragten eine für sie irrelevante Frage. Dieses Beispiel findet ihr [hier](https://example.com).

---

# Pretesting

## Pretesting mit LLMs

LLM generated survey responses can mimick some aspects of human responses when you know the sociodemographics of the expected human respondents and condition the LLM on that via "personas". The survey responses often reproduce averages fairly reliably but lack variance. For our purposes this seems surely good enough.

### Simulating Human Opinions with Large Language Models: Opportunities and Challenges for Personalized Survey Data Modeling

Kaiser et al. (2025) created ASPIRE (Automated Synthetic Persona Interview and Response Engine) (Couldn't find their python code though).

They create personas based on real sociodemographic data:

> "You are a [ethnicity] [sex] living in [state]. You were born in the year [year] in [country of birth]. Your nationality is [nationality] and you speak [language] fluently. Your education level is: [education level] and your profession is: [profession]. You describe your financial situation with [financial situation]."

**Conclusion**: Synthetic data is better than random (average agreement between synthetic and real responses was 78% (p&lt;0.001)). However, they found a positivity bias where synthetic responses are more positive than real ones. No strong evidence of sociodemographic bias was found (though this doesn't mean there's no bias!). They also observed lower variance in synthetic responses (Kaiser et al., 2025).

### Out of One, Many: Using Language Models to Simulate Human Samples

Argyle et al. (2023) seems to be (among the) first to look in detail at how closely LLM responses map to human responses. They claim that LLMs are very good at reproducing the biases and views of subpopulations when prompted with personas.

### Synthetic Replacements for Human Survey Data? The Perils of Large Language Models.
(Bisbee et al., 2024)

**Conclusion**: Persona-based LLM reponses are good to model human averages but show less variance and non-faithful regression coefficients.
Not surprising to me: Pre-trained LLMs have great calibration. After RLHF calibration collapses. Plus the temperature is less than 1 usually (so they sample with less variance than what they think the true next-word distribution is.

### Large Language Models in Survey Research: Generating Synthetic Data and Unlocking New Possibilities.
(Motoki et al., 2023)

They let the LLM generate the sociodemographic data (e.g. "73% female, 91% White, average age 41.6" and the LLM draws values to match that).
Generally similar pattern. LLM responses are not a bad approximation but have some problems (too homogeneous, bias).

### LLMs Reproduce Human Purchase Intent via Semantic Similarity Elicitation of Likert Ratings
(Maier et al., 2025)

Also as [blog post](https://www.pymc-labs.com/blog-posts/AI-based-Customer-Research). For Likert Scales (aka numeric responses): First let LLMs produce text, second match text with semantic similarity rating to Likert scale (very negative, negative, etc.). They had less positivity bias than humans in their experiments

### Creating Synthetic User Research: Using Persona Prompting and Autonomous Agents
[Blog Post](https://medium.com/data-science/creating-synthetic-user-research-using-persona-prompting-and-autonomous-agents-b521e0a80ab6) that let's the LLM come up with five more detailed personas and let's them have a group chat over a product with autonomous agents. Less relevant for us.
