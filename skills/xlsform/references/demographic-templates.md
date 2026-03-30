# Demographic Variable Templates from qwac

> Pre-fetched from qwacback.correlaid.org at skill build time.
> These are validated survey instruments — prefer them over writing demographics from scratch.

At runtime, fetch directly:
- Question `z4bm7lrn7mopedd`: `qwacback:get_question "z4bm7lrn7mopedd"` or `web_fetch https://qwacback.correlaid.org/api/questions/z4bm7lrn7mopedd`
- Study `2z4e5jfgc6s6mwy`: `qwacback:list_questions` (study: `2z4e5jfgc6s6mwy`) or `web_fetch https://qwacback.correlaid.org/api/studies/2z4e5jfgc6s6mwy/questions`

---


## Question: z4bm7lrn7mopedd

```json
{"answer_type":"multiple_choice_other","concept":"Geschlecht (Selbstdefinition)","group":{"id":"z4bm7lrn7mopedd","type":"other","concept":"Geschlecht (Selbstdefinition)","description":"Was ist Ihr Geschlecht?"},"id":"z4bm7lrn7mopedd","name":"geschlecht","order":0,"question_text":"Was ist Ihr Geschlecht?","study":{"id":"5b37ljzo3huvufj","title":"Ausgewählte CDL Instrumente"},"variables":[{"id":"enezj7mufloyed5","name":"geschlecht_weiblich","concept":"Geschlecht: weiblich","question":"weiblich","prequestion_text":"Was ist Ihr Geschlecht?","ivu_instructions":"","answer_type":"multiple_choice","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null},{"id":"5663i7cgw3aeezk","name":"geschlecht_maennlich","concept":"Geschlecht: männlich","question":"männlich","prequestion_text":"Was ist Ihr Geschlecht?","ivu_instructions":"","answer_type":"multiple_choice","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null},{"id":"ic6ns2xksv6nwqw","name":"geschlecht_nicht_binaer","concept":"Geschlecht: nicht-binär","question":"nicht-binär","prequestion_text":"Was ist Ihr Geschlecht?","ivu_instructions":"","answer_type":"multiple_choice","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null},{"id":"kw7ooobbzqtfhbx","name":"geschlecht_kein_geschlecht","concept":"Geschlecht: kein Geschlecht","question":"kein Geschlecht","prequestion_text":"Was ist Ihr Geschlecht?","ivu_instructions":"","answer_type":"multiple_choice","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null},{"id":"a4mulbnvyv6zlj2","name":"geschlecht_keine_angabe","concept":"Geschlecht: keine Angabe","question":"keine Angabe","prequestion_text":"Was ist Ihr Geschlecht?","ivu_instructions":"","answer_type":"multiple_choice","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null},{"id":"dct6n7d3yxae767","name":"geschlecht_other","concept":"Geschlecht (Freitextangabe)","question":"Geschlecht (eigene Angabe)","prequestion_text":"","ivu_instructions":"","answer_type":"text","has_other":false,"has_long_list":false,"long_list_standard":"","categories":null}]}
```

### XLSForm

```json
{
  "survey": [
    {
      "type": "select_multiple geschlecht",
      "name": "geschlecht",
      "label": "Was ist Ihr Geschlecht?"
    },
    {
      "type": "text",
      "name": "geschlecht_other",
      "label": "Geschlecht (eigene Angabe)",
      "relevant": "${geschlecht} = 'other'"
    }
  ],
  "choices": [
    {
      "list_name": "geschlecht",
      "name": "weiblich",
      "label": "weiblich"
    },
    {
      "list_name": "geschlecht",
      "name": "maennlich",
      "label": "männlich"
    },
    {
      "list_name": "geschlecht",
      "name": "nicht_binaer",
      "label": "nicht-binär"
    },
    {
      "list_name": "geschlecht",
      "name": "kein_geschlecht",
      "label": "kein Geschlecht"
    },
    {
      "list_name": "geschlecht",
      "name": "keine_angabe",
      "label": "keine Angabe"
    },
    {
      "list_name": "geschlecht",
      "name": "other",
      "label": "Geschlecht (eigene Angabe)"
    }
  ],
  "settings": {}
}
```

### Questions

```json
[{"id":"aumvvvapbcls4tl","study_id":"2z4e5jfgc6s6mwy","name":"geschlecht","concept":"Gender","question_text":"Welches Geschlecht haben Sie?","answer_type":"single_choice","variable_ids":["aumvvvapbcls4tl"],"order":0},{"id":"r5kkuluyvp7qa5u","study_id":"2z4e5jfgc6s6mwy","name":"geburtsdatum","concept":"Birth year","question_text":"Wann sind Sie geboren worden?","answer_type":"integer","variable_ids":["r5kkuluyvp7qa5u"],"order":1},{"id":"pzwsndura3cnqvo","study_id":"2z4e5jfgc6s6mwy","name":"deutsche_staatsangehoerigkeit","concept":"German citizenship","question_text":"Haben Sie die deutsche Staatsangehörigkeit?","answer_type":"single_choice","variable_ids":["pzwsndura3cnqvo"],"order":2},{"id":"konacurchitc3xh","study_id":"2z4e5jfgc6s6mwy","name":"erwerb_deutsche_staatsangehoerigkeit","concept":"Mode of citizenship acquisition","question_text":"Wie haben Sie die deutsche Staatsangehörigkeit erhalten?","answer_type":"single_choice","variable_ids":["konacurchitc3xh"],"order":3},{"id":"xmlvwj64tskbqxn","study_id":"2z4e5jfgc6s6mwy","name":"jahr_erwerb_deutsche_staatsangehoerigkeit","concept":"Year of citizenship acquisition","question_text":"In welchem Jahr haben Sie die deutsche Staatsangehörigkeit erhalten?","answer_type":"integer","variable_ids":["xmlvwj64tskbqxn"],"order":4},{"id":"uoy7blrjb6atqsd","study_id":"2z4e5jfgc6s6mwy","name":"zweite_staatsangehoerigkeit","concept":"Dual nationality","question_text":"Haben Sie zusätzlich eine andere Staatsangehörigkeit?","answer_type":"single_choice","variable_ids":["uoy7blrjb6atqsd"],"order":5},{"id":"zpm6mepmimuovqg","study_id":"2z4e5jfgc6s6mwy","name":"eu_staatsangehoerigkeit","concept":"EU citizenship","question_text":"Haben Sie die Staatsangehörigkeit eines Landes der Europäischen Union?","answer_type":"single_choice","variable_ids":["zpm6mepmimuovqg"],"order":6},{"id":"e7a6dxogw7zymhr","study_id":"2z4e5jfgc6s6mwy","name":"arbeitserlaubnis","concept":"Work permit","question_text":"Haben Sie eine Arbeitserlaubnis?","answer_type":"single_choice","variable_ids":["e7a6dxogw7zymhr"],"order":7},{"id":"aqfk2ugfveoxx3o","study_id":"2z4e5jfgc6s6mwy","name":"geboren_in_deutschland","concept":"Born in Germany","question_text":"Sind Sie in Deutschland geboren?","answer_type":"single_choice","variable_ids":["aqfk2ugfveoxx3o"],"order":8},{"id":"phmzllyiois5ui2","study_id":"2z4e5jfgc6s6mwy","name":"jahr_erster_umzug_nach_deutschland","concept":"Year of first move to Germany","question_text":"Wann sind Sie zum ersten Mal nach Deutschland gezogen? Bitte geben Sie das Jahr an.","answer_type":"integer","variable_ids":["phmzllyiois5ui2"],"order":9},{"id":"awgfdvoj3wi3pbq","study_id":"2z4e5jfgc6s6mwy","name":"vater_geboren_in_deutschland","concept":"Father born in Germany","question_text":"Ist Ihr Vater in Deutschland geboren worden?","answer_type":"single_choice","variable_ids":["awgfdvoj3wi3pbq"],"order":10},{"id":"f6ubhja4g4fzf3b","study_id":"2z4e5jfgc6s6mwy","name":"mutter_geboren_in_deutschland","concept":"Mother born in Germany","question_text":"Ist Ihre Mutter in Deutschland geboren worden?","answer_type":"single_choice","variable_ids":["f6ubhja4g4fzf3b"],"order":11},{"id":"pipbb5f676gzpb4","study_id":"2z4e5jfgc6s6mwy","name":"familienstand","concept":"Marital status","question_text":"Welchen Familienstand haben Sie?","answer_type":"single_choice","variable_ids":["pipbb5f676gzpb4"],"order":12},{"id":"4mhtnv7zlvyo3yd","study_id":"2z4e5jfgc6s6mwy","name":"partnerschaft_im_haushalt","concept":"Cohabiting partnership","question_text":"Leben Sie zurzeit mit einer Person aus Ihrem Haushalt in einer Partnerschaft?","answer_type":"single_choice","variable_ids":["4mhtnv7zlvyo3yd"],"order":13},{"id":"bqjifqgs2cjt3aq","study_id":"2z4e5jfgc6s6mwy","name":"hoechster_schulabschluss","concept":"Highest school qualification","question_text":"Welchen höchsten allgemeinbildenden Schulabschluss haben Sie?","answer_type":"single_choice","variable_ids":["bqjifqgs2cjt3aq"],"order":14},{"id":"kergryxdyz3s6cq","study_id":"2z4e5jfgc6s6mwy","name":"angestrebter_schulabschluss","concept":"Aspired school qualification","question_text":"Welchen allgemeinbildenden Schulabschluss streben Sie an?","answer_type":"single_choice","variable_ids":["kergryxdyz3s6cq"],"order":15},{"id":"cccvu7wdva2df5b","study_id":"2z4e5jfgc6s6mwy","name":"hoechster_beruflicher_abschluss","concept":"Highest vocational qualification","question_text":"Welchen höchsten beruflichen Ausbildungsabschluss haben Sie?","answer_type":"single_choice","variable_ids":["cccvu7wdva2df5b"],"order":16},{"id":"ybrg7dboj6mz5xu","study_id":"2z4e5jfgc6s6mwy","name":"haupttaetigkeit","concept":"Main activity","question_text":"Was machen Sie zurzeit hauptsächlich?","answer_type":"single_choice_other","variable_ids":["ybrg7dboj6mz5xu"],"order":17},{"id":"i7emlryupntrmmu","study_id":"2z4e5jfgc6s6mwy","name":"haupttaetigkeit_other","concept":"Main activity (other)","question_text":"Sonstiges (bitte angeben)","answer_type":"text","variable_ids":["i7emlryupntrmmu"],"order":18},{"id":"4gfrur46sgpxhvq","study_id":"2z4e5jfgc6s6mwy","name":"erwerbssituation","concept":"Employment situation","question_text":"Welche Erwerbssituation passt für Sie?","answer_type":"single_choice","variable_ids":["4gfrur46sgpxhvq"],"order":19},{"id":"bsnyt46ilqau2ke","study_id":"2z4e5jfgc6s6mwy","name":"fruehere_erwerbstaetigkeit","concept":"Previous employment","question_text":"Waren Sie früher einmal vollzeit- oder teilzeiterwerbstätig?","answer_type":"single_choice","variable_ids":["bsnyt46ilqau2ke"],"order":20},{"id":"6sffxabitmiui34","study_id":"2z4e5jfgc6s6mwy","name":"anzahl_beschaeftigungsverhaeltnisse","concept":"Number of employment relationships","question_text":"Wie viele Beschäftigungsverhältnisse in abhängiger Beschäftigung haben Sie zurzeit?","answer_type":"single_choice","variable_ids":["6sffxabitmiui34"],"order":21},{"id":"v4z4yiuqxcdopvv","study_id":"2z4e5jfgc6s6mwy","name":"zusatzlich_selbstaendig","concept":"Additional self-employment","question_text":"Sind Sie zusätzlich selbstständig oder freiberuflich tätig?","answer_type":"single_choice","variable_ids":["v4z4yiuqxcdopvv"],"order":22},{"id":"inwkk6jtj7jfmhu","study_id":"2z4e5jfgc6s6mwy","name":"woechentliche_arbeitsstunden","concept":"Weekly working hours","question_text":"Wie viele Stunden arbeiten Sie normalerweise insgesamt pro Woche?","answer_type":"integer","variable_ids":["inwkk6jtj7jfmhu"],"order":23},{"id":"hluov7ygr6inuts","study_id":"2z4e5jfgc6s6mwy","name":"berufliche_taetigkeit","concept":"Occupational activity","question_text":"Welche berufliche Tätigkeit üben Sie aus? Wenn Sie nicht mehr Voll- oder Teilzeit erwerbstätig sind: Welche Tätigkeit haben Sie bei Ihrer früheren hauptberuflichen Erwerbstätigkeit zuletzt ausgeübt?","answer_type":"text","variable_ids":["hluov7ygr6inuts"],"order":24},{"id":"jt76ntxp7oa2emd","study_id":"2z4e5jfgc6s6mwy","name":"berufliche_stellung","concept":"Occupational status","question_text":"Welche berufliche Stellung haben oder hatten Sie in Ihrer hauptsächlich ausgeübten Erwerbstätigkeit?","answer_type":"single_choice","variable_ids":["jt76ntxp7oa2emd"],"order":25},{"id":"6he7ajr4rdbjnth","study_id":"2z4e5jfgc6s6mwy","name":"landwirt_flaeche","concept":"Farm size (self-employed farmer)","question_text":"Selbstständige*r Landwirt*in oder Genossenschaftsbauer","answer_type":"single_choice","variable_ids":["6he7ajr4rdbjnth"],"order":26},{"id":"2uvfji6ismbtrxc","study_id":"2z4e5jfgc6s6mwy","name":"akademiker_mitarbeiter","concept":"Number of employees (freelance professional)","question_text":"Akademiker*in in freiem Beruf (Arzt/Ärztin, Rechtsanwalt/Rechtsanwältin, Steuerberater*in und Ähnliches) und habe/hatte …","answer_type":"single_choice","variable_ids":["2uvfji6ismbtrxc"],"order":27},{"id":"2lklmthyigvpagy","study_id":"2z4e5jfgc6s6mwy","name":"selbstaendig_mitarbeiter","concept":"Number of employees (self-employed)","question_text":"Selbstständig im Handel, im Gastgewerbe, im Handwerk, in der Industrie, in der Dienstleistung, auch Ich-AG oder PGH-Mitglied und habe/hatte …","answer_type":"single_choice","variable_ids":["2lklmthyigvpagy"],"order":28},{"id":"v4yoevilvvpe33j","study_id":"2z4e5jfgc6s6mwy","name":"beamter_dienst","concept":"Civil service grade","question_text":"Beamter/Beamtin, Richter*in, Berufssoldat*in, und zwar …","answer_type":"single_choice","variable_ids":["v4yoevilvvpe33j"],"order":29},{"id":"cpdpjsqxxocegcg","study_id":"2z4e5jfgc6s6mwy","name":"angestellte_taetigkeit","concept":"Employee level","question_text":"Angestellte*r, und zwar …","answer_type":"single_choice","variable_ids":["cpdpjsqxxocegcg"],"order":30},{"id":"bxnwl32nsv3wnrs","study_id":"2z4e5jfgc6s6mwy","name":"arbeiter_qualifikation","concept":"Worker qualification level","question_text":"Arbeiter*in, und zwar …","answer_type":"single_choice","variable_ids":["bxnwl32nsv3wnrs"],"order":31},{"id":"xyejoe3vzyghu5i","study_id":"2z4e5jfgc6s6mwy","name":"handy_nutzung","concept":"Mobile phone use in household","question_text":"Werden in Ihrem Haushalt Handys oder Smartphones benutzt?","answer_type":"single_choice","variable_ids":["xyejoe3vzyghu5i"],"order":32},{"id":"25vg22gqykxhpii","study_id":"2z4e5jfgc6s6mwy","name":"anzahl_handynummern","concept":"Number of personal mobile numbers","question_text":"Wie viele Handynummern nutzen Sie persönlich derzeit für Telefongespräche, egal ob privat oder beruflich?","answer_type":"single_choice","variable_ids":["25vg22gqykxhpii"],"order":33},{"id":"oxfcykdmzc333zc","study_id":"2z4e5jfgc6s6mwy","name":"festnetz_verfuegbar","concept":"Landline availability","question_text":"Ist Ihr Haushalt über ein Festnetztelefon erreichbar?","answer_type":"single_choice","variable_ids":["oxfcykdmzc333zc"],"order":34},{"id":"btdop5jqztnezhz","study_id":"2z4e5jfgc6s6mwy","name":"anzahl_festnetznummern","concept":"Number of landline numbers","question_text":"Wie viele Festnetznummern gibt es in Ihrem Haushalt?","answer_type":"single_choice","variable_ids":["btdop5jqztnezhz"],"order":35},{"id":"wjowkr45az66b2i","study_id":"2z4e5jfgc6s6mwy","name":"letzte_internetnutzung","concept":"Time since last internet use","question_text":"Wann haben Sie, abgesehen von heute, zuletzt das Internet genutzt, egal ob zu Hause, am Arbeitsplatz, in der Schule, in der Universität oder an einem anderen Ort und egal mit welchem Gerät (Smartphone, PC)?","answer_type":"single_choice","variable_ids":["wjowkr45az66b2i"],"order":36},{"id":"jkn6npchfzt7lgf","study_id":"2z4e5jfgc6s6mwy","name":"internetnutzung_haeufigkeit","concept":"Internet use frequency","question_text":"Wie oft haben Sie im Durchschnitt in den letzten 3 Monaten das Internet genutzt?","answer_type":"single_choice","variable_ids":["jkn6npchfzt7lgf"],"order":37},{"id":"3525dmr7vbxyfrb","study_id":"2z4e5jfgc6s6mwy","name":"haushaltsgroesse","concept":"Household size","question_text":"Wie viele Personen leben ständig in Ihrem Haushalt?","answer_type":"single_choice","variable_ids":["3525dmr7vbxyfrb"],"order":38},{"id":"yzcngqjfltoieoe","study_id":"2z4e5jfgc6s6mwy","name":"haushaltsmitglieder","concept":"Household composition","question_text":"Wie viele Personen in Ihrem Haushalt sind …","answer_type":"integer","variable_ids":["yzcngqjfltoieoe"],"order":39},{"id":"rdgh7qadmt7hjcf","study_id":"2z4e5jfgc6s6mwy","name":"einkommensbezieher_im_haushalt","concept":"Number of household income earners","question_text":"Wie viele Personen tragen insgesamt zum Haushaltseinkommen bei?","answer_type":"single_choice","variable_ids":["rdgh7qadmt7hjcf"],"order":40},{"id":"3pwl2kkwnjk6vvw","study_id":"2z4e5jfgc6s6mwy","name":"haushaltsnettoeinkommen","concept":"Household net income (exact)","question_text":"Wie hoch ist das durchschnittliche monatliche Nettoeinkommen Ihres Haushalts insgesamt?","answer_type":"integer","variable_ids":["3pwl2kkwnjk6vvw"],"order":41},{"id":"rd3jzqajb3pnn44","study_id":"2z4e5jfgc6s6mwy","name":"haushaltsnettoeinkommen_klasse","concept":"Household net income (banded)","question_text":"Wenn Sie nicht einen exakten Betrag nennen können oder wollen, dann ordnen Sie bitte die Höhe Ihres monatlichen Haushaltsnettoeinkommens einer der hier gelisteten Größenklassen zu.","answer_type":"single_choice","variable_ids":["rd3jzqajb3pnn44"],"order":42},{"id":"tmt6ywvaaowleda","study_id":"2z4e5jfgc6s6mwy","name":"persoenliches_nettoeinkommen","concept":"Personal net income (exact)","question_text":"Wie hoch ist Ihr durchschnittliches monatliches Nettoeinkommen insgesamt?","answer_type":"integer","variable_ids":["tmt6ywvaaowleda"],"order":43},{"id":"7csgrve4t2kbbvq","study_id":"2z4e5jfgc6s6mwy","name":"persoenliches_nettoeinkommen_klasse","concept":"Personal net income (banded)","question_text":"Wenn Sie nicht einen exakten Betrag nennen können oder wollen, dann ordnen Sie bitte die Höhe Ihres monatlichen Nettoeinkommens einer der hier gelisteten Größenklassen zu.","answer_type":"single_choice","variable_ids":["7csgrve4t2kbbvq"],"order":44}]
```

### XLSForm Export

```json
{
  "survey": [
    {
      "type": "select_one geschlecht",
      "name": "geschlecht",
      "label": "Welches Geschlecht haben Sie?"
    },
    {
      "type": "integer",
      "name": "geburtsdatum",
      "label": "Wann sind Sie geboren worden?"
    },
    {
      "type": "select_one deutsche_staatsangehoerigkeit",
      "name": "deutsche_staatsangehoerigkeit",
      "label": "Haben Sie die deutsche Staatsangehörigkeit?"
    },
    {
      "type": "select_one erwerb_deutsche_staatsangehoerigkeit",
      "name": "erwerb_deutsche_staatsangehoerigkeit",
      "label": "Wie haben Sie die deutsche Staatsangehörigkeit erhalten?"
    },
    {
      "type": "integer",
      "name": "jahr_erwerb_deutsche_staatsangehoerigkeit",
      "label": "In welchem Jahr haben Sie die deutsche Staatsangehörigkeit erhalten?"
    },
    {
      "type": "select_one zweite_staatsangehoerigkeit",
      "name": "zweite_staatsangehoerigkeit",
      "label": "Haben Sie zusätzlich eine andere Staatsangehörigkeit?"
    },
    {
      "type": "select_one eu_staatsangehoerigkeit",
      "name": "eu_staatsangehoerigkeit",
      "label": "Haben Sie die Staatsangehörigkeit eines Landes der Europäischen Union?"
    },
    {
      "type": "select_one arbeitserlaubnis",
      "name": "arbeitserlaubnis",
      "label": "Haben Sie eine Arbeitserlaubnis?"
    },
    {
      "type": "select_one geboren_in_deutschland",
      "name": "geboren_in_deutschland",
      "label": "Sind Sie in Deutschland geboren?"
    },
    {
      "type": "integer",
      "name": "jahr_erster_umzug_nach_deutschland",
      "label": "Wann sind Sie zum ersten Mal nach Deutschland gezogen? Bitte geben Sie das Jahr an."
    },
    {
      "type": "select_one vater_geboren_in_deutschland",
      "name": "vater_geboren_in_deutschland",
      "label": "Ist Ihr Vater in Deutschland geboren worden?"
    },
    {
      "type": "select_one mutter_geboren_in_deutschland",
      "name": "mutter_geboren_in_deutschland",
      "label": "Ist Ihre Mutter in Deutschland geboren worden?"
    },
    {
      "type": "select_one familienstand",
      "name": "familienstand",
      "label": "Welchen Familienstand haben Sie?"
    },
    {
      "type": "select_one partnerschaft_im_haushalt",
      "name": "partnerschaft_im_haushalt",
      "label": "Leben Sie zurzeit mit einer Person aus Ihrem Haushalt in einer Partnerschaft?"
    },
    {
      "type": "select_one hoechster_schulabschluss",
      "name": "hoechster_schulabschluss",
      "label": "Welchen höchsten allgemeinbildenden Schulabschluss haben Sie?"
    },
    {
      "type": "select_one angestrebter_schulabschluss",
      "name": "angestrebter_schulabschluss",
      "label": "Welchen allgemeinbildenden Schulabschluss streben Sie an?"
    },
    {
      "type": "select_one hoechster_beruflicher_abschluss",
      "name": "hoechster_beruflicher_abschluss",
      "label": "Welchen höchsten beruflichen Ausbildungsabschluss haben Sie?"
    },
    {
      "type": "select_one haupttaetigkeit",
      "name": "haupttaetigkeit",
      "label": "Was machen Sie zurzeit hauptsächlich?"
    },
    {
      "type": "text",
      "name": "haupttaetigkeit_other",
      "label": "Sonstiges (bitte angeben)",
      "relevant": "${haupttaetigkeit} = 'other'"
    },
    {
      "type": "select_one erwerbssituation",
      "name": "erwerbssituation",
      "label": "Welche Erwerbssituation passt für Sie?"
    },
    {
      "type": "select_one fruehere_erwerbstaetigkeit",
      "name": "fruehere_erwerbstaetigkeit",
      "label": "Waren Sie früher einmal vollzeit- oder teilzeiterwerbstätig?"
    },
    {
      "type": "select_one anzahl_beschaeftigungsverhaeltnisse",
      "name": "anzahl_beschaeftigungsverhaeltnisse",
      "label": "Wie viele Beschäftigungsverhältnisse in abhängiger Beschäftigung haben Sie zurzeit?"
    },
    {
      "type": "select_one zusatzlich_selbstaendig",
      "name": "zusatzlich_selbstaendig",
      "label": "Sind Sie zusätzlich selbstständig oder freiberuflich tätig?"
    },
    {
      "type": "integer",
      "name": "woechentliche_arbeitsstunden",
      "label": "Wie viele Stunden arbeiten Sie normalerweise insgesamt pro Woche?"
    },
    {
      "type": "text",
      "name": "berufliche_taetigkeit",
      "label": "Welche berufliche Tätigkeit üben Sie aus? Wenn Sie nicht mehr Voll- oder Teilzeit erwerbstätig sind: Welche Tätigkeit haben Sie bei Ihrer früheren hauptberuflichen Erwerbstätigkeit zuletzt ausgeübt?"
    },
    {
      "type": "select_one berufliche_stellung",
      "name": "berufliche_stellung",
      "label": "Welche berufliche Stellung haben oder hatten Sie in Ihrer hauptsächlich ausgeübten Erwerbstätigkeit?"
    },
    {
      "type": "select_one landwirt_flaeche",
      "name": "landwirt_flaeche",
      "label": "Selbstständige*r Landwirt*in oder Genossenschaftsbauer"
    },
    {
      "type": "select_one akademiker_mitarbeiter",
      "name": "akademiker_mitarbeiter",
      "label": "Akademiker*in in freiem Beruf (Arzt/Ärztin, Rechtsanwalt/Rechtsanwältin, Steuerberater*in und Ähnliches) und habe/hatte …"
    },
    {
      "type": "select_one selbstaendig_mitarbeiter",
      "name": "selbstaendig_mitarbeiter",
      "label": "Selbstständig im Handel, im Gastgewerbe, im Handwerk, in der Industrie, in der Dienstleistung, auch Ich-AG oder PGH-Mitglied und habe/hatte …"
    },
    {
      "type": "select_one beamter_dienst",
      "name": "beamter_dienst",
      "label": "Beamter/Beamtin, Richter*in, Berufssoldat*in, und zwar …"
    },
    {
      "type": "select_one angestellte_taetigkeit",
      "name": "angestellte_taetigkeit",
      "label": "Angestellte*r, und zwar …"
    },
    {
      "type": "select_one arbeiter_qualifikation",
      "name": "arbeiter_qualifikation",
      "label": "Arbeiter*in, und zwar …"
    },
    {
      "type": "select_one handy_nutzung",
      "name": "handy_nutzung",
      "label": "Werden in Ihrem Haushalt Handys oder Smartphones benutzt?"
    },
    {
      "type": "select_one anzahl_handynummern",
      "name": "anzahl_handynummern",
      "label": "Wie viele Handynummern nutzen Sie persönlich derzeit für Telefongespräche, egal ob privat oder beruflich?"
    },
    {
      "type": "select_one festnetz_verfuegbar",
      "name": "festnetz_verfuegbar",
      "label": "Ist Ihr Haushalt über ein Festnetztelefon erreichbar?"
    },
    {
      "type": "select_one anzahl_festnetznummern",
      "name": "anzahl_festnetznummern",
      "label": "Wie viele Festnetznummern gibt es in Ihrem Haushalt?"
    },
    {
      "type": "select_one letzte_internetnutzung",
      "name": "letzte_internetnutzung",
      "label": "Wann haben Sie, abgesehen von heute, zuletzt das Internet genutzt, egal ob zu Hause, am Arbeitsplatz, in der Schule, in der Universität oder an einem anderen Ort und egal mit welchem Gerät (Smartphone, PC)?"
    },
    {
      "type": "select_one internetnutzung_haeufigkeit",
      "name": "internetnutzung_haeufigkeit",
      "label": "Wie oft haben Sie im Durchschnitt in den letzten 3 Monaten das Internet genutzt?"
    },
    {
      "type": "select_one haushaltsgroesse",
      "name": "haushaltsgroesse",
      "label": "Wie viele Personen leben ständig in Ihrem Haushalt?"
    },
    {
      "type": "integer",
      "name": "haushaltsmitglieder",
      "label": "Wie viele Personen in Ihrem Haushalt sind …"
    },
    {
      "type": "select_one einkommensbezieher_im_haushalt",
      "name": "einkommensbezieher_im_haushalt",
      "label": "Wie viele Personen tragen insgesamt zum Haushaltseinkommen bei?"
    },
    {
      "type": "integer",
      "name": "haushaltsnettoeinkommen",
      "label": "Wie hoch ist das durchschnittliche monatliche Nettoeinkommen Ihres Haushalts insgesamt?"
    },
    {
      "type": "select_one haushaltsnettoeinkommen_klasse",
      "name": "haushaltsnettoeinkommen_klasse",
      "label": "Wenn Sie nicht einen exakten Betrag nennen können oder wollen, dann ordnen Sie bitte die Höhe Ihres monatlichen Haushaltsnettoeinkommens einer der hier gelisteten Größenklassen zu."
    },
    {
      "type": "integer",
      "name": "persoenliches_nettoeinkommen",
      "label": "Wie hoch ist Ihr durchschnittliches monatliches Nettoeinkommen insgesamt?"
    },
    {
      "type": "select_one persoenliches_nettoeinkommen_klasse",
      "name": "persoenliches_nettoeinkommen_klasse",
      "label": "Wenn Sie nicht einen exakten Betrag nennen können oder wollen, dann ordnen Sie bitte die Höhe Ihres monatlichen Nettoeinkommens einer der hier gelisteten Größenklassen zu."
    }
  ],
  "choices": [
    {
      "list_name": "geschlecht",
      "name": "1",
      "label": "männlich"
    },
    {
      "list_name": "geschlecht",
      "name": "2",
      "label": "weiblich"
    },
    {
      "list_name": "geschlecht",
      "name": "3",
      "label": "divers"
    },
    {
      "list_name": "deutsche_staatsangehoerigkeit",
      "name": "1",
      "label": "ja"
    },
    {
      "list_name": "deutsche_staatsangehoerigkeit",
      "name": "2",
      "label": "nein"
    },
    {
      "list_name": "erwerb_deutsche_staatsangehoerigkeit",
      "name": "1",
      "label": "durch Geburt"
    },
    {
      "list_name": "erwerb_deutsche_staatsangehoerigkeit",
      "name": "2",
      "label": "durch Adoption"
    },
    {
      "list_name": "erwerb_deutsche_staatsangehoerigkeit",
      "name": "3",
      "label": "durch Einbürgerung"
    },
    {
      "list_name": "erwerb_deutsche_staatsangehoerigkeit",
      "name": "4",
      "label": "als Aussiedler*in"
    },
    {
      "list_name": "zweite_staatsangehoerigkeit",
      "name": "1",
      "label": "ja"
    },
    {
      "list_name": "zweite_staatsangehoerigkeit",
      "name": "2",
      "label": "nein"
    },
    {
      "list_name": "eu_staatsangehoerigkeit",
      "name": "1",
      "label": "ja"
    },
    {
      "list_name": "eu_staatsangehoe
```
