/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8081,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
			classes: "always",
		},
		{
			module: "updatenotification",
			classes: "always",
			position: "top_bar"
		},
		{
			module: "clock",
			classes: "always",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "Upcoming Events",
			classes: "Guillermo",
			position: "top_left",
			config: {
                maximumNumberOfDays: "33",
                fetchInterval: "15000",
				calendars: [
					{
						symbol: "calendar-check",
						url: "",
                                                auth: {
                                                method: 'basic' // I have tried all three options for this
                                                }
                                        }
				           ]
			}
		},
		{
			module: "weather",
			position: "top_right",
			classes: "always",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Guadalajara",
				locationID: "4005539", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: ""
			}
		},
		{
			module: "weather",
			position: "top_right",
			classes: "always",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Guadalajara",
				locationID: "4005539", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: ""
			}
		},
        {
            disabled: true,
			module: 'MMM-GoogleTasks',
            header: "Upcoming Tasks",
	    classes: "Guillermo",
            position: "top_left",
            config: {
                listID: "",
                updateInterval: "5000"
                // See below for Configuration Options
            }
        },
        {
            module: "MMM-DiscordWatch",
            position: "bottom_right",
	    classes: "Guillermo",
            header: "Discord",
            config: {
              discordToken: "",
              tableClass: "small",
              maxEntries: 10,
              maxMessageLength: 30,
              maxMessageLines: 2,
              wrapEvents: true, 
              fade: true,
              fadePoint: 0.25,
              showChannel: true,
              subscribedChannels: ["950523658844127232","950528126977441812"], //2 channels to listen to for example
            }
          },
          {
            module: "MMM-Canvas",
            position: "top_left",
            header: "ITESO Assigments",
	    classes: "Guillermo",
            config: {
              accessKey: "",
              colors: ["grey","grey","grey","grey"],
              courses: ["22157","24164","22113","22142"],
              urlbase: "",
              assignMaxLen: 35,
              assignToDisplay: 8,
            }
          },
		  
		  {
			module: 'MMM-MQTT',
			position: 'bottom_left',
			header: 'Sensors',
			classes: "Guillermo",
			config: {
				logging: false,
				useWildcards: false,
				mqttServers: [
					{
						address: '192.168.1.210',          // Server address or IP address
						port: '1883',                  // Port number if other than default
						// ca: '/path/to/ca/cert.crt', // Path to trusted CA certificate file (optional)
						// clientId: 'mirror',         // Custom MQTT client ID (optional)
						//user: 'user',                  // Leave out for no user
						//password: 'password',          // Leave out for no password
						subscriptions: [
							{
								topic: 'casa/sensor/Temp', // Topic to look for
								label: 'Temperature', // Displayed in front of value
								suffix: 'C',         // Displayed after the value
								decimals: 1,          // Round numbers to this number of decimals
								sortOrder: 10,        // Can be used to sort entries in the same table
								maxAgeSeconds: 60,    // Reduce intensity if value is older
								broadcast: true,      // Broadcast messages to other modules
								colors: [             // Value dependent colors
									{ upTo: -10, value: "blue", label: "blue", suffix: "blue" },
									{ upTo: 0, value: "#00ccff", label: "#00ccff", suffix: "#00ccff" },
									{ upTo: 10, value: "yellow"},
									{ upTo: 25, label: "green", suffix: "green" },
									{ upTo: 100, label: "red" }, // The last one is used for higher values too
								],
							},
							{
								topic: 'casa/sensor/humedad',
								label: 'Humidity',
								suffix: '%',
								decimals: 1,
								sortOrder: 20,
								maxAgeSeconds: 60 
							},
						]
					}
				],
			}
		},
		{
            module: "MMM-NowPlayingOnSpotify",
            position: "bottom_left",
            config: {
              showCoverArt: false,
              clientID: "",
              clientSecret: "",
              accessToken: "",
              refreshToken: ""
            },
	    classes: "Guillermo",
          },
	  {
    module: 'MMM-Face-Reco-DNN',
    config: {
      // Logout 15 seconds after user was not detected any more
      // If they are detected within this period, the delay will start again
      logoutDelay: 15000,
      // How often the recognition starts in milliseconds
      // With a Raspberry Pi 3+ it works well every 2 seconds
      checkInterval: 2000,
      // Module set used for when there is no face detected ie no one is in front of the camera
      noFaceClass: 'noface',
      // Module set used for when there is an unknown/unrecognised face detected
      unknownClass: 'unknown',
      // Module set used for when there is a known/recognised face detected
      knownClass: 'known',
      // Module set used for strangers and if no user is detected
      defaultClass: 'default',
      // Set of modules which should be shown for any user ie when there is any face detected
      everyoneClass: 'everyone',
      // Set of modules that are always shown - show if there is a face or no face detected
      alwaysClass: 'always',
      // XML to recognize with haarcascade
      cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
      // Pre-encoded pickle with the faces
      encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
      // Use Raspberry Pi camera or another type
      // 1 = RasPi camera, 0 = other camera
      usePiCamera: 1,
      // If using another type of camera, you can choose
      // i.e. 0 = /dev/video0 or 'http://link.to/live'
      source: 0,
      // Rotate camera
      rotateCamera: 0,
      // Method of facial recognition
      // dnn = deep neural network, haar = haarcascade
      method: 'dnn',
      // Which face detection model to use
      // "hog" is less accurate but faster on CPUs
      // "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated
      detectionMethod: 'hog',
      // How long in milliseconds modules take to hide and show
      animationSpeed: 0,
      // Path to Python to run the face recognition
      // null or '' means default path
      pythonPath: null,
      // Should a welcome message be shown using the MagicMirror alerts module?
      welcomeMessage: true,
      // Dictionary for person name mapping in welcome message
      // Allows for displaying name with complex character sets in welcome message e.g. jerome => Jérôme, hideyuki => 英之
      usernameDisplayMapping: null,
      // Capture new pictures of recognized people, if unknown we save it in folder "unknown"
      // So you can extend your dataset and retrain it afterwards for better recognitions
      extendDataset: false,
      // If extendDataset is true, you need to set the full path of the dataset
      dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
      // How much distance between faces to consider it a match. Lower is more strict.
      tolerance: 0.6,
      // allow multiple concurrent user logins, 0=no, any other number is the maximum number of concurrent logins
      multiUser: 0,
    }
},
	    {
		  module: "MMM-Face-Multi-User-Recognition-SMAI",
		  position: "top_right",
		  classes: "always",
		  config: {
		    useMMMFaceRecoDNN: true
		  }
	    },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
