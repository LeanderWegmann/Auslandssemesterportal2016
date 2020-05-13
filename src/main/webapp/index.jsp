<!DOCTYPE html>
<html>
<head>
    <title>DHBW Auslandsinfo</title>
    <meta name="viewport" content="width=device-width, initial-scale=0.8, user-scalable=no" charset="UTF-8">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/jquery-ui-dist/jquery-ui.min.css">
    <link rel="stylesheet" href="node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="node_modules/jquery-form-validator/form-validator/theme-default.min.css">
    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css">
    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/solid.min.css">
    <script src="js/pages/index.js"></script>
    <script type="text/javascript">
        window.cookieconsent_options = {
            "message": "Diese Webiste verwendet Cookies",
            "dismiss": "Verstanden!",
            "learnMore": "More info",
            "link": null,
            "theme": "light-top"
        };
    </script>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/jquery-form-validator/form-validator/jquery.form-validator.min.js"></script>
    <script src="node_modules/cookieconsent/build/cookieconsent.min.js"></script>
    <script src="node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="node_modules/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="js/app.js"></script>
</head>

<body>
<!--  PopupFeld für Registrierung --------------------------------------------------------------->
<div class="erfolgreich"></div>
<div class="popUpBack"></div>

<div class="modal fade" id="register" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form action="" id="regForm">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Registrieren</h4>
                </div>
                <div class="modal-body">
                    <div class="student auslandsmitarbeiter">
                        <p class="red" style="margin-top: 10px">*Pflichtfelder.</p>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" placeholder="Vorname*" class="inBox form-control" id="inVorname"
                                           required>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" placeholder="Nachname*" class="inBox form-control" id="inNachname"
                                           required>
                                </div>
                            </div>
                            <input type="email" placeholder="DHBW E-Mail: Nachname.Vorname@student.dhbw-karlsruhe.de*"
                                   class="inBox form-control" id="inMail" required pattern="^[a-zA-Z0-9]*(\.){0,1}[a-zA-Z0-9]+@(student\.){0,1}dhbw-karlsruhe\.de$"
                                   title="Nachname.Vorname@student.dhbw-karlsruhe.de">
                        </div>
                    </div>
                    <div class="student">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="number" placeholder="Matrikelnummer*" class="inBox form-control"
                                           id="inMatrikel" required>
                                </div>
                                <div class="col-md-6">
                                    <select class="inBox form-control" id="inStudiengang" required>
                                        <option value="">Studiengang*</option>
                                        <option value="Wirtschaftsinformatik">Wirtschaftsinformatik</option>
                                        <option value="Wirtschaftsingenieurwesen">Wirtschaftsingenieurwesen</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" placeholder="Kurs*" class="inBox form-control" id="inKurs"
                                           required>
                                </div>
                                <div class="col-md-6">
                                    <select class="inBox form-control" id="inStandort" required>
                                        <option value="">DHBW Standort wählen*</option>
                                        <option value="DHBW_Karlsruhe">DHBW Karlsruhe</option>
                                        <option value="DHBW_Stuttgart">DHBW Stuttgart</option>
                                        <option value="DHBW_Mannheim">DHBW Mannheim</option>
                                        <option value="DHBW_Mosbach">DHBW Mosbach</option>
                                        <option value="DHBW_Lörrach">DHBW Lörrach</option>
                                        <option value="DHBW_Ravensburg">DHBW Ravensburg</option>
                                        <option value="DHBW_Heidenheim">DHBW Heidenheim</option>
                                        <option value="DHBW_Villingen-Schwenningen">DHBW Villingen-Schwenningen</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="password" placeholder="Passwort 1. Mal*" class="inBox form-control"
                                           id="inPwSt1" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Das Passwort muss mindestens 8 Zeichen lang sein und eine Nummer sowie einen Groß- und Kleinbuchstaben beinhalten">
                                </div>
                                <div class="col-md-6">
                                    <input type="password" placeholder="Passwort 2. Mal*" class="inBox form-control"
                                           id="inPwSt2" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="falsch"></p>
                </div>
                <div class="modal-footer">
                    <input type="submit" class="btn btnReg" value="Registrieren" style="width: auto;">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
                </div>
            </form>
        </div>



    </div>

</div>
<!-- Modal -->
<div id="login" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Login</h4>
            </div>
            <div class="modal-body">
                <form id="loginForm" action="">
                    <input type="email" placeholder="E-Mail Adresse" id="inEmail" class=" inBox" required autofocus
                           style="width:80%; margin-left:5px">
                    <br>
                    <input type="password" placeholder="Passwort" id="inPasswort" class=" inBox" required style="width:80%; margin-left:5px">
                    <p id="falschLogin" style="color: red; margin-bottom: 0px; display: none">Falsche Eingabe.
                        Bitte versuchen sie es erneut.</p>
                    <br>
                    <a href="forgot_pw.html">Passwort vergessen?</a>
                    <br>
                </form>
            </div>
            <div class="modal-footer">
                <input form="loginForm" type="submit" class="btn" id="btnLogin" value="Login" style="width: auto;">

            </div>
        </div>

    </div>
</div>

<!-- Navigationsleiste-------------------------------------------------------------------- -->
<div class="header">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-2">
            <a href="index.jsp"> <img style="width:100%;height:auto" class="img-rounded img-responsive"
                                      src="images/DHBW-Logo.svg" /></a>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
            <h3 class="headerWebsite">Auslandsstudienportal DHBW Karlsruhe</h3>
        </div>

        <div class="col-md-3">
            <div class="logFenster">
                <button type="button" class="btn btn-default navMargin loginMain" data-toggle="modal" id="loginMain"
                        data-target="#login">Login</button>

                <button type="button" class="btn btn-default navMargin" data-toggle="modal" id="register"
                        data-target="#register">Registrieren</button>
            </div>
            <div class="logoutFenster">


                Eingeloggt als <b class="nutzerName"></b>

                <button type="button" class="btn btn-default navMargin" id="logout" data-target="#logout">Logout</button>

            </div>

        </div>
    </div>
</div>
<!-- Mittlerer Teil --------------------------------------------------------------------------->
    <div class="container" id="adminBereich">
        <div class="col-md-12">
            <div class="tile" id="verwaltungIndex">
                <img src="images/homescreen.svg" class="tileImg"> <img src="images/Edit.png" class="smallImg">
                <p>Startseite bearbeiten</p>
            </div>
            <div class="tile" id="verwaltungUser">
                <img src="images/user.svg" class="tileImg"> <img src="images/Edit.png" class="smallImg">
                <p>Benutzer verwalten</p>
            </div>
            <div class="tile" id="verwaltungPortal">
                <img src="images/edit-process.svg" class="tileImg"> <img src="images/Edit.png" class="smallImg">
                <p>Bewerbungsprozess bearbeiten</p>
            </div>
        </div>
    </div>
    
    <a href="#">
		<img src="images/chevron.png" id="chevronup" class="chevronup"  style="opacity:0; transition-duration: 1s;position:fixed; z-index: 999; bottom:25px; right:11%;" alt="Pfeil nach oben" />
	</a>
    
    <div class="inhalt" id="normalBereich">
        <div class="container">
            <div class="row navBar">

                <div class="col-md-12">
                    <a class="portalInfo btn btn-default navMargin" href="#portalInfo">Was ist
                        das?</a> <a class="btn btn-default navMargin" href="#auslandsAngebote">Auslandsangebote</a>
                    <a class="btn btn-default navMargin" href="#erfahrungsBerichte">Erfahrungsberichte</a>

                    <a class="btn btn-default navMargin" href="#infoMaterial">Infomaterial</a>
                    <div class="pull-right"><a class="btn cmsBtn eingeloggt" id="zumPortal" href="bewerbungsportal.html">Zum
                            Bewerbungsportal</a></div>
                    <div class="pull-right"> <label class="btn cms cmsBtn inline Admin" style="float: none"><a style="color: white"
                                href="choose-diagram.html">Bewerbungsprozesse bearbeiten</a></label> </div>
                    <div class="pull-right"><label class="btn cms cmsBtn inline Mitarbeiter" style="float: none"><a
                                style="color: white" href="task_overview.html">Bewerbungen Validieren</a></label></div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="imgSlider"></div>
                </div>

            </div>
        </div>




        <div class="container">
            <div class="row content">
                <div class="portalInfo inhaltBox row" id="portalInfo">
                    <div class="col-md-12">
                        <label class="btn cms cmsBtn">Bearbeiten</label>
                        <label class="btn" id="laden">Laden</label>
                        <div class="pull-right">
                            <p class="btn cms cmsBtn backAdmin Admin">Zurück zum Hauptmenü</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="images/weltkarte.jpg" id="imgWorld" />
                        <label class="btn cmsBtn cmsPortal btnBild" id="btnportalBild">Bild Ändern
                            <input class="upload" type="file" id="portalBild" />
                        </label>
                        <br>
                        <br>
                    </div>

                    <div class="col-md-6">
                        <h3 class="nonCms titel"></h3>
                        <p class="cmsPortal">
                            <b style="color: #D60000">Titel ändern</b>
                        </p>
                        <input class="inBox cmsPortal" id="inPortalTitel" value="" placeholder="" />
                        <ul class="funktionen nonCms">

                        </ul>
                        <p class="cmsPortal">
                            <b style="color: #D60000">Infoelemente bearbeiten</b>
                        </p>

                        <div class="inputsPortal cmsPortal"></div>

                        <p class="cmsPortal btn cmsBtn" id="cmsBtnInfoNeu">Neues
                            Infoelement hinzufügen +</p>
                        <p class="red nonCms">Jetzt einfach registrieren und Vorteile
                            nutzen</p>
                        <button type="button" class="btn btn-default linkreg nonCMS" data-toggle="modal" data-target="#register">Registrieren</button>

                        <p class="cmsPortal cmsBtn btn" id="cmsPortalSave" style="clear: both; float: right">Änderungen
                            speichern</p>
                    </div>
                </div>
                <div class="auslandsAngebote inhaltBox row" id="auslandsAngebote">
                    <div class="col-md-12">
                        <label class="btn cms cmsBtn">Bearbeiten</label>
                    </div>
                    <h1>Auslandsangebote</h1>
                    <div class="col-md-12 cmsAngebote">
                        <label class="btn btnAngebote inline cmsBtn" id="btnAddStudgang" style="margin-right: 10px">Neuen
                            Studiengang hinzufügen +</label>
                        <label class="btn btnAngebote inline cmsBtn" id="btnAddAngebot" style="margin-right: 10px">Neue
                            Auslandsuni anlegen</label> <label class="btn btnAngebote inline cmsBtn" id="btnEditAngebot">Vorhandene
                            Angebote bearbeiten</label>
                    </div>
                    <div class="col-md-12 cmsEditAngebote" id="cmsAddStudgang">
                        <input type="text" placeholder="Neuer Studiengang" class="inBox inline" id="inNewStudiengang" />
                        <label class="cmsBtn btn inline" id="btnSaveNewStudiengang" style="float: none">Speichern</label>
                        <p style="color: red; font-size: small; font-style: italic">Achten
                            sie auf die korrekte Schreibweise.</p>
                    </div>
                    <div class="col-md-12 cmsEditAngebote" id="cmsAddAngebot">
                        <p style="color: red; font-style: italic; font-size: small">Pflichtfelder
                            sind mit * gekennzeichnet.</p>
                        <select class="inBox zweiD" id="inStudiengangNeuAngebot">

                        </select>
                        <p style="color: red; font-size: small; font-style: italic">Ist
                            der Studiengang nicht aufgeführt, legen sie ihn bitte über den
                            oben zu sehenden Button an.</p>
                        <div class="nonCms angebote" id="angebotNeu" style="margin-right: 5px;">
                            <div class="col-md-12">
                                <input class="inBox" id="inNeuAngebot" type="text" placeholder="Name der Universität*" />
                                <div class="navBarAng">
                                    <div class="navelAng active" id="nNeu11">Infos</div>
                                    <!--                                     <div class="navelAng" id="nNeu12">FAQs</div> -->
                                    <div class="navelAng" id="nNeu13">Erfahrungsbericht</div>
                                    <div class="navelAng" id="nNeu14">Bilder</div>
                                </div>
                                <div class="contentAng active" id="cNeu11">
                                    <div class="pull-left" style="width: 60%">
                                        <textarea class="inBox" id="inNeuAngebotInfo" placeholder="Geben sie hier nützliche Informationen zur Universität ein.*"
                                            cols="60" rows="6"></textarea>
                                    </div>
                                    <div class="pull-right">
                                        <input type="text" class="inBox" id="inMaps1" placeholder="Kürzel der Uni, z.B. CSUSM, Abertay*" /><br>
                                        <input type="text" class="inBox" id="inMaps2" placeholder="Stadt der Universität*" /><br>
                                        <input type="text" class="inBox" id="inMaps3" placeholder="Land der Universität*" /><br>
                                    </div>
                                </div>
                                <div class="contentAng" id="cNeu12">
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqFr1" placeholder="Frage 1" />
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqAn1" placeholder="Antwort 1" /><br>
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqFr2" placeholder="Frage 2" />
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqAn2" placeholder="Antwort 2" /><br>
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqFr3" placeholder="Frage 3" />
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqAn3" placeholder="Antwort 3" /><br>
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqFr4" placeholder="Frage 4" />
                                    <input type="text" class="inBox inline longBox" id="inNeuFaqAn4" placeholder="Antwort 4" />
                                </div>
                                <div class="contentAng" id="cNeu13">
                                    <textarea class="inBox" rows="4" cols="80" id="inNeuAngebotErfahrungsbericht"
                                        placeholder="Tragen sie hier einen kurzen Erfahrungsbericht ein."></textarea>
                                    <input type="text" class="inBox longBox" id="inNeuAngebotErfAutor" placeholder="Autor, Kurs, Jahr des Auslandssemesters"
                                        style="float: right" />
                                </div>
                                <div class="contentAng" id="cNeu14">
                                    <b>Der Upload von Bildern funktioniert noch nicht!!!</b> <input type="file" class="inBox"
                                        id="inNeuAngebotBild1" style="color: white" /> <input type="file" class="inBox"
                                        id="inNeuAngebotBild2" style="color: white" /> <input type="file" class="inBox"
                                        id="inNeuAngebotBild3" style="color: white" /> <input type="file" class="inBox"
                                        id="inNeuAngebotBild4" style="color: white" />
                                </div>
                            </div>
                            <p class="cmsAngebote cmsBtn btn" id="cmsBtnSave" style="clear: both; float: right">Änderungen
                                speichern</p>
                        </div>

                    </div>
                    <div class="col-md-12 cmsEditAngebote" id="cmsEditAngebot">
                        <p class="inline">Welches Angebot möchten sie bearbeiten?</p>
                        <select class="inBox inline zweiD" id="selEditAngebot">
                        </select>
                        <div class="nonCms angebote" id="angebotEdit" style="margin-right: 5px;">
                            <div class="col-md-12">
                                <h3 id="EditAngebot"></h3>
                                <div class="navBarAng">
                                    <div class="navelAng active" id="nEdit11">Infos</div>
                                    <!--                                     <div class="navelAng" id="nEdit12">FAQs</div> -->
                                    <div class="navelAng" id="nEdit13">Erfahrungsbericht</div>
                                    <div class="navelAng" id="nEdit14">Bilder</div>
                                </div>
                                <div class="contentAng active" id="cEdit11">
                                    <div class="pull-left" style="width: 60%">
                                        <textarea class="inBox" id="inEditAngebotInfo" placeholder="Geben sie hier nützliche Informationen zur Universität ein.*"
                                            cols="60" rows="6"></textarea>
                                    </div>
                                    <div class="pull-right">
                                        <input type="text" class="inBox" id="inEditMaps1" placeholder="Kürzel der Uni, z.B. CSUSM, Abertay*" /><br>
                                        <input type="text" class="inBox" id="inEditMaps2" placeholder="Stadt der Universität*" /><br>
                                        <input type="text" class="inBox" id="inEditMaps3" placeholder="Land der Universität*" /><br>
                                    </div>
                                </div>
                                <div class="contentAng" id="cEdit12">
                                    <input type="text" class="inBox inline longBox" id="inEditFaqFr1" placeholder="Frage 1" />
                                    <input type="text" class="inBox inline longBox" id="inEditFaqAn1" placeholder="Antwort 1" /><br>
                                    <input type="text" class="inBox inline longBox" id="inEditFaqFr2" placeholder="Frage 2" />
                                    <input type="text" class="inBox inline longBox" id="inEditFaqAn2" placeholder="Antwort 2" /><br>
                                    <input type="text" class="inBox inline longBox" id="inEditFaqFr3" placeholder="Frage 3" />
                                    <input type="text" class="inBox inline longBox" id="inEditFaqAn3" placeholder="Antwort 3" /><br>
                                    <input type="text" class="inBox inline longBox" id="inEditFaqFr4" placeholder="Frage 4" />
                                    <input type="text" class="inBox inline longBox" id="inEditFaqAn4" placeholder="Antwort 4" />
                                </div>
                                <div class="contentAng" id="cEdit13">
                                    <textarea class="inBox" rows="4" cols="80" id="inEditAngebotErfahrungsbericht"
                                        placeholder="Tragen sie hier einen kurzen Erfahrungsbericht ein."></textarea>
                                    <input type="text" class="inBox longBox" id="inEditAngebotErfAutor" placeholder="Autor, Kurs, Jahr des Auslandssemesters"
                                        style="float: right" />
                                </div>
                                <div class="contentAng" id="cEdit14">
                                    <b>Hier können keine Bilder hochgeladen werden.</b>




                                </div>
                            </div>
                            <p class="cmsAngebote cmsBtn btn" id="cmsBtnSave" style="clear: both; float: right">Änderungen
                                speichern</p>
                        </div>
                    </div>
                    <div class="col-md-12 nonCms">
                        <p class="inline">Sortieren nach Studiengang</p>
                        <select class="inBox inline zweiD" id="selStudiengang"></select>
                    </div>
                    <a href="#" class="linkUp" id="angebotLinkUp">Zum Seitenanfang</a>

                </div>
                <div class="erfahrungsBerichte inhaltBox row" id="erfahrungsBerichte">
                    <div class="col-md-12">
                        <label class="btn cms cmsBtn">Bearbeiten</label>
                    </div>
                    <h1 class="nonCms titel">Erfahrungsberichte</h1>
                    <div class="berichte">
                        <div class="row kurzbericht zeig" id="kb1">
                            <div class="col-md-6">
                                <img src="images/bewerbungsbild.JPG" id="imgWorld"> <label class="btn cmsBtn cmsBerichte btnBild"
                                    id="btnberichtBild1" style="float: right">Bild Ändern<input class="upload" type="file"
                                        id="berichtBild1" /></label>
                            </div>
                            <div class="col-md-6">
                                <p class="middle nonCms">
                                    <i>"Hallo, mein Name ist Valentin und ich habe im Rahmen
                                        meines Wirtschaftsinformatik Studiums an der DHBW Karlsruhe
                                        ein Auslandssemester von Januar bis Mai 2014 an der California
                                        State University San Marcos (CSUSM) absolviert. Ich bin sehr
                                        froh darüber, dass für mich die Möglichkeit bestand, an solch
                                        einer Erfahrung teilnehmen zu können. Ich empfehle es jedem,
                                        diese vielleicht einmalige Chance in seinem Leben zu nutzen um
                                        ein anderes, fremdes Universitätsleben in einem fernen Land
                                        kennen zu lernen. Wenn Ihr mehr über meinen oder den
                                        Aufenthalt anderer Kommilitonen erfahren wollt, dann meldet
                                        euch an!"</i>
                                </p>
                            </div>
                            <div class="col-md-6 cmsBerichte">
                                <textarea class="inBox" style="width: 100%; height: 250px"></textarea>
                            </div>
                        </div>
                        <div class="row kurzbericht" id="kb2">
                            <div class="col-md-6">
                                <img src="images/bewerbungsbild1.jpg" id="imgWorld"> <label class="btn cmsBtn cmsBerichte btnBild"
                                    id="btnberichtBild2" style="float: right">Bild Ändern<input class="upload" type="file"
                                        id="berichtBild2" /></label>
                            </div>
                            <div class="col-md-6">
                                <p class="middle nonCms">
                                    <i>"Hi, ich bin Patrick, dualer Student der
                                        Wirtschaftsinformatik von 2012 - 2015. In meinem 4. Semester
                                        habe ich vier Monate in Schottland an der University of
                                        Abertay in Dundee, Schottland, studiert. Eine der besten
                                        Entscheidungen in meinem Leben. Ich habe dort unglaublich
                                        viele Nationalitäten näher kennen gelernt. Eine Stadt mit
                                        knapp 150.000 Einwohner und 15.000 Studenten in der das
                                        Studentenleben boomt. Wer Spaß hat an Projekten ist in Dundee
                                        genau richtig. Dort wird mehr Wert auf die praktische Kenntnis
                                        als auf theoretisches Blabla gelegt! Nehmt die Möglichkeit
                                        wahr! Es lohnt sich."</i>
                                </p>
                            </div>
                            <div class="col-md-6 cmsBerichte">
                                <textarea class="inBox" style="width: 100%; height: 250px"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" id="berichtPfeile">
                        <span class="fas fa-chevron-left arrow" id="arrLeft" style="font-size: 2.5em;"></span>
                        <span class="fas fa-chevron-right arrow" id="arrRight" style="font-size: 2.5em;"></span>
                    </div>
                    <div class="col-md-12 cmsBerichte">
                        <label class="btn cmsBtn pull-right" id="cmsBtnBerichtNeu">Erfahrungsbericht
                            hinzufügen</label>
                        <p class="cmsBerichte cmsBtn btn" id="cmsBtnSave" style="clear: both; float: right">Änderungen
                            speichern</p>
                    </div>

                </div>
                <div class="infoMaterial inhaltBox row" id="infoMaterial">
                    <div class="col-md-12">
                        <label class="btn cms cmsBtn">Bearbeiten</label>
                    </div>
                    <div class="col-md-6 mittig">
                        <a href="https://karlsruhe.dhbw.de/fileadmin/user_upload/documents/content-de/Auslandsamt/Infobroschuere-Ausland.pdf"><img
                                id="imgBro" src="images/infoBro.jpg" /></a> <label class="btn cmsBtn cmsInfo btnBild"
                            style="float: right">Bild
                            Ändern<input class="upload" type="file" />
                        </label>
                    </div>

                    <div class="col-md-6">
                        <h3 class="titel nonCms" id="infoMaterialTitel">Informationsmaterial</h3>
                        <p class="cmsInfo">
                            <b style="color: #D60000">Titel ändern</b>
                        </p>
                        <input class="inBox cmsInfo" id="inInfoTitel" value="" placeholder="" />
                        <ul class="informationen nonCms">
                            <li id="infoli1"><a href=""></a></li>
                            <li id="infoli2"><a href=""></a></li>
                            <li id="infoli3"><a href=""></a></li>
                            <li id="infoli4"><a href=""></a></li>
                            <li id="infoli5"><a href=""></a></li>
                            <li id="infoli6"><a href=""></a></li>
                            <li id="infoli7"><a href=""></a></li>
                        </ul>
                        <p class="cmsInfo">
                            <b style="color: #D60000">Linkelemente bearbeiten</b>
                        </p>
                        <div class="inputsInfo cmsInfo"></div>
                        <!--<p class="red nonCms">Jetzt einfach registrieren und Vorteile
                            nutzen</p>
                        <button type="button" class="btn btn-default navMargin"
                    data-toggle="modal" id="register" data-target="#register">Registrieren</button>
                          -->
                        <p class="cmsInfo btn cmsBtn" id="cmsBtnLinkNeu">Neuen Link
                            hinzufügen +</p>
                        <p class="cmsInfo cmsBtn btn" id="cmsBtnSave" style="clear: both; float: right">Änderungen
                            speichern</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Fußzeile ------------------------------------------------------------------------------>
<div class="footer">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="pull-right">
                <p>
                    <a href="index.jsp">Startseite</a> | <a href="impressum.html">Impressum</a>
                    | <a href="faq.html">FAQs</a> |
                    <!-- <a class="linkUp" href="#">
                    <img src="images/chevron_up.png" width="5%" height="5%" alt="Pfeil nach oben" />
                    </a> -->
                </p>
            </div>
        </div>
    </div>
</div>
</body>
</html>