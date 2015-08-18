function phasenberechnung()
      {
      var jetzt, jahr, vm, diff, anz;
      var syn = 29.530588;
      var text = "Falsche Systemzeit, Berechnung nicht aktiv!";
      var phase = 1;
      jetzt = new Date();
      jahr = jetzt.getYear();
      if(jahr < 1900) { jahr += 1900; }
      if(jahr >= 2010)
        {
        vm = new Date(2009, 11, 31, 20, 12, 36) / 86400000;
        jetzt = jetzt / 86400000;
        diff = jetzt - vm;
        anz = diff / syn;
        phase = Math.round(anz * 100) / 100;
        phase = Math.floor((phase - Math.floor(phase)) * 100);
        if(phase == 0)
          {
          phase = 100;
          text = "Vollmond (2. Viertel)";
          }
        else if(phase < 25 || (phase > 25 && phase < 50))
          { text = "Abnehmender Mond"; }
        else if(phase == 25) { text = "Halbmond (3. Viertel)"; }
        else if(phase == 50) { text = "Neumond (4. Viertel)"; }
        else if((phase > 50 && phase < 75) || (phase > 75 && phase < 100))
          { text = "Zunehmender Mond"; }
        else if(phase == 75) { text = "Halbmond (1. Viertel)"; }
        }
      //document.getElementById("mondtext").innerHTML = text;
      alert(text + "\nPhase: " + phase);
      }