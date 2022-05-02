const CONSTANTS = {
  BUILDING: {
    K1: '6238860c303cbab102eae3c5',
    K2: '62388610303cbab102eae3c7',
    K3: '62388664303cbab102eae3c9',
    K4: '62388666303cbab102eae3cb',
  },

  NATIONALITIES: {
    VIETNAM: '623736b36f608d84c08460fd',
    LAOS: '623736ba6f608d84c08460ff',
  },

  DANTOC: {
    KINH: '62373d336f608d84c0846165',
    LAO: '6247e17bbfad448b38733e14'
  },

  STATUS: {
    ALL: '0',
    FULL: '1',
    EXIST: '2',
    EMPTY: '3',
  },



  EMAIL_DOMAIN: [
    "gmail.com", "yahoo.com", "hotmail.com", "aol.com", "hotmail.co.uk", "hotmail.fr", "msn.com",
    "yahoo.fr", "wanadoo.fr", "orange.fr", "comcast.net", "yahoo.co.uk", "yahoo.com.br", "yahoo.co.in", "live.com",
    "rediffmail.com", "free.fr", "gmx.de", "web.de", "yandex.ru", "ymail.com", "libero.it",
    "outlook.com", "uol.com.br", "bol.com.br", "mail.ru", "cox.net", "hotmail.it", "sbcglobal.net", "sfr.fr",
    "live.fr", "verizon.net", "live.co.uk", "googlemail.com", "yahoo.es", "ig.com.br", "live.nl",
    "bigpond.com", "terra.com.br", "yahoo.it", "neuf.fr", "yahoo.de", "alice.it", "rocketmail.com",
    "att.net", "laposte.net", "facebook.com", "bellsouth.net", "yahoo.in", "hotmail.es", "charter.net",
    "yahoo.ca", "yahoo.com.au", "rambler.ru", "hotmail.de", "tiscali.it", "shaw.ca", "yahoo.co.jp", "sky.com",
    "earthlink.net", "optonline.net", "freenet.de", "t-online.de", "aliceadsl.fr", "virgilio.it", "home.nl",
    "qq.com", "telenet.be", "me.com", "yahoo.com.ar", "tiscali.co.uk", "yahoo.com.mx", "voila.fr",
    "gmx.net", "mail.com", "planet.nl", "tin.it", "live.it", "ntlworld.com", "arcor.de", "yahoo.co.id",
    "frontiernet.net", "hetnet.nl", "live.com.au", "yahoo.com.sg", "zonnet.nl", "club-internet.fr", "juno.com", "optusnet.com.au",
    "blueyonder.co.uk", "bluewin.ch", "skynet.be", "sympatico.ca", "windstream.net", "mac.com", "centurytel.net",
    "chello.nl", "live.ca", "aim.com", "bigpond.net.au"
  ],

  KEY_NUMBER_PHONE: ['+84',
    '+856'],

  REQUEST_OPTIONS: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Set-Cookie': 'cross-site-cookie=whatever; SameSite=None; Secure',
      'Pragma': 'no-cache'
    }
  },

  LOCALE_TEMPLATE: {
    EN: {
      MONTH: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      }
    }
  }
}

export {
  CONSTANTS
}
