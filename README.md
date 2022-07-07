# Exam #2: "indovinelli"
## Student: s303386 Turco Gianluca

## React Client Application Routes

- Route `/`: route principale dove sono visualizzati gli indovinelli "aperti" e "chiusi"; selezionando un indovinello è possibile visualizzarne il contentuto sia in caso di stato "aperto" sia "chiuso", se si tratta di un utente loggato
- Route `/ranking`: route dedicata alla classifica dei 3 migliori utenti 
- Route `/login` : route dedicata al login
- Route `/addRiddle` : route che contiene il form relativo all'inserimento di un nuovo indovinello

## API Server
- GET `/riddles`
  - request parameters: nessuno
  - response body content: oggetto riddles contenente tutti gli indovinelli presenti nella tabella riddles del DB

- GET `/topScores`
  - request parameters: nessuno
  - response body content: oggetto topScores contenente i 3 migliori utenti con i relativi punteggi

  - GET `/answers`
  - request parameters: nessuno
  - response body content: oggetto answers contenente tutte le risposte date a tutti gli indovinelli

- PUT `/updateRiddle`
  - request parameters and request body content : oggetto riddle contenente l'id dell'utente che ha creato l'indovinello, la domanda relativa all'indovinello, il nuovo stato da aggiornare(che è chiuso) e il vincitore da aggiornare(0 se il tempo è scaduto e nessuno ha indovinato) 
  - response body content : 200 in caso di successo, 503 in caso di errore

- PUT `/updateScore`
  - request parameters and request body content : oggetto score contenente l'id dell'utente e il punteggio da aggiungere 
  - response body content : 200 in caso di successo, 503 in caso di errore

- PUT `/updateCounter`
  - request parameters and request body content : id univoco che identifica l'indovinello nel DB e il counter da aggiornare 
  - response body content : 200 in caso di successo, 503 in caso di errore

  - POST `/addRiddle`
  - request parameters and request body content : oggetto riddle contenente tutte le informazioni dell'indovinello, pronto per essere salvato nel DB
  - response body content : 201 in caso di successo, 503 in caso di errore, 422 in caso di validazione dei dati nel req.body fallita

    - POST `/addAnswer`
  - request parameters and request body content : oggetto answer contente una risposta relativa ad un indovinello
  - response body content : 201 in caso di successo, 503 in caso di errore


## Database Tables

- Table `users` - id,email,password,nome e salt - necessaria ad identificare l'utente eseguendo il login
- Table `riddles` - id,user,question,difficulty,duration,solution,advice1,advice2,state,winner,counter - Contiene tutti i dati relativi agli indovinelli(id è solo un dato univoco e autoincrementale per ogni indovinello, che funge da chiave primaria)
- Table `scores` - user,name,score - Memorizza i punteggi ottenuti dai vari utenti
- Table `answers` -  user,question,answer - Contiene tutte le risposte agli indovinelli, fornite dagli utenti


## Main React Components

- `RiddleRoute` (in `RiddleRoute.js`): richiama i vari componenti che costituiscono l'applicazione
- `NavigationBar` (in `NavigationBar.js`): definisce la barra di navigazione dell'applicazione web; da essa si raggiungono tutte le route
- `DisplayRanking` (in `DisplayRanking.js`): crea una tabella che mostra la classifica aggiornata dei migliori 3 utenti
- `DisplayRiddle` (in `DisplayRiddle.js`): crea la lista degli indovinelli disponibili 
- `CloseState` (in `CloseState.js`): definisce il contenuto degli indovinelli "chiusi" 
- `OpenState` (in `OpenState.js`): definisce il contenuto degli indovinelli "aperti", consentendo all'utente di inserire una risposta
- `RiddleForm` (in `RiddleForm.js`): form per l'aggiunta di un indovinello
- `LoginForm` (in `LoginComponents.js`): form per il login

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- studente1@studenti.polito.it, password 
- studente2@studenti.polito.it, password
- studente3@studenti.polito.it, password
- studente4@studenti.polito.it, password
- test@polito.it, password