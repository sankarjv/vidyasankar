if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js"); }

window.onload = function() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Google Analytics
    (function() {
        const gtagjs = document.createElement('script');
        gtagjs.src = 'https://www.googletagmanager.com/gtag/js?id=G-RVVTSDRBNZ';
        gtagjs.async = true;
        document.head.appendChild(gtagjs);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RVVTSDRBNZ');
    })();

    // Inject CSS styles
    function cssStyle() {
        if (document.getElementById('css-style')) return;
        
        const style = document.createElement('style');
        style.id = "css-style";
        style.textContent = `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { height: 100%; overflow-x: hidden; }
            body {
                font-family: Arial, Helvetica, sans-serif;
                min-height: 100vh;
                min-height: 100dvh;
                padding: 5px;
                text-align: center;
                background: #f7fafc;
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }
            .report {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                min-height: 100dvh;
                max-width: 100vw;
                overflow-x: hidden;
            }
            .mobile { width: 100vw; height: 100vh; background: #ffffff; display: flex; flex-direction: column; }
            .header {
                color: blue;
                background: palegoldenrod;
                padding: 8px;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: clamp(15px, 4vw, 20px);
                font-weight: bold;
                flex-shrink: 0;
            }
            .menu-grid {
                flex: 1;
                padding: 5px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(7, 1fr);
                gap: clamp(6px, 2vw, 12px);
                background: #f7fafc;
                overflow-y: auto;
            }
            .menu-button {
                background: linear-gradient(145deg, #f5f5dc 0%, #e6e6be);
                border: none; border-radius: 15px; padding: 1px; cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 5px 5px 12px #c8c89e, -5px -5px 12px #ffffff, inset 0 0 5px rgba(0,0,0,0.1);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                text-decoration: none; color: green; font-weight: 600;
                text-align: center; min-height: 60px;
            }
            .menu-button:hover {
                transform: translateY(-2px);
                box-shadow: 7px 7px 16px #c8c89e, -7px -7px 16px #ffffff, inset 0 0 8px rgba(0,0,0,0.15);
                background: linear-gradient(145deg, palegoldenrod, #e6d68a); color: red;
            }
            .menu-button:active {
                transform: translateY(1px);
                box-shadow: 3px 3px 8px #c8c89e, -3px -3px 8px #ffffff, inset 0 0 10px rgba(0,0,0,0.2);
                background: linear-gradient(145deg, #e6d68a, palegoldenrod); color: red;
            }
            .menu-icon { font-size: clamp(20px, 5vw, 30px); margin-bottom: 1px; }
            .menu-text { font-size: clamp(20px, 5vw, 30px); }
            .footer {
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                background: palegoldenrod; color: blue; text-align: center; padding: 5px 0 4px;
                font-size: clamp(12px, 2.5vw, 15px);
                flex-shrink: 0;
            }
            .tip {
                display:none; position:absolute; margin-top:20px; margin-left:-100px;
                background:palegoldenrod; color:black; border-radius:4px; padding:4px 5px;
                font-size:12px; text-align: left; z-index:1000; box-shadow:0 2px 5px silver;
            }
            .txt:hover .tip { display: block; }
            
            /* Mobile-specific optimizations */
            @media screen and (max-width: 380px) {
                .menu-grid {
                    gap: 4px;
                    padding: 4px;
                }
                .menu-button {
                    min-height: 50px;
                    border-radius: 12px;
                }
                .header {
                    padding: 6px;
                    min-height: 35px;
                }
            }
            
            /* Landscape orientation adjustments */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                .header {
                    padding: 4px;
                    min-height: 30px;
                }
                .menu-grid {
                    gap: 4px;
                    padding: 4px;
                }
                .menu-button {
                    min-height: 45px;
                }
                .footer {
                    padding: 3px 0;
                }
            }
            
            /* Prevent text selection on buttons */
            .menu-button, .header, .footer {
                -webkit-user-select: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }
    cssStyle();

    // Language translation setup
    window.gtranslateSettings = {
        "default_language":"en",
        "native_language_names":true,
        "detect_browser_language":true,
        "languages":["en","te","hi","kn","ta","ml","mr","gu","pa","bn","sd","ur","ne","si","my","th","ar","ru","ja","zh-CN","es","fr","de","it","pt"],
        "wrapper_selector":".trans",
        "select_language_label":"Language"
    };
    
    const gtScript = document.createElement('script');
    gtScript.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
    gtScript.defer = true; 
    document.head.appendChild(gtScript);

    // Helper function to get language
    window.getLang = function() { 
        try {
            const sel = document.querySelector('.trans select');
            if (sel && sel.value) return sel.value;
        } catch (e) {}
        return 'en|en';
    };

    // Create header with tooltip
    const report = document.getElementById("report") || document.querySelector('.report') || document.body;
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
        <div class="trans"></div>&nbsp;
        <span id="txt" class="txt">VidyaShankar&nbsp;Panchang&nbsp;&#9432;
            <span id="tip" class="tip"><br>
                Please give your location access once,<br>
                to get timings based on your location,<br>
                or else defaults to Hyderabad. <br><br>
                All language translations are automatic,<br>
                hence there can be some discrepancies. <br><br>
                Used UTF-Emojis as Menu-icons and, <br>
                Zodiac-symbols as such there can be,<br>
                differences in some languages. <br><br>
                This App does not require internet after,<br>
                first use, except for language change. <br><br>
                All timings are accurate upto the minute,<br>
                matches with Andra Patrika Panchangam,<br>
                Andra Jyoti Calendar, drik panchang .com,<br>
                JagannathHora app, Rashtriya Panchang <br><br>
                To exit this app press back button twice. <br><br>
            </span>
        </span>
    `;
    report.appendChild(header);

    // Create menu grid
    function menuGrid() {
        const menu = document.createElement("div");
        menu.className = "menu-grid";
        menu.innerHTML = `
            <button class="menu-button" onclick="location.href='panchd.htm?' + getLang()">
                <div class="menu-icon"><span style="color:red;">&#65039;&#2384;</span></div>
                <div class="menu-text">Today-Panchang</div>
            </button>
            <button class="menu-button" onclick="location.href='panchf.htm?' + getLang()">
                <div class="menu-icon"><span style="color:red;">&#2358;&#2381;&#2352;&#2368;</span></div>
                <div class="menu-text">Paksh-Panchang</div>
            </button>
            <button class="menu-button" onclick="location.href='planetd.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#129680;</div>
                <div class="menu-text">Present-Planets</div>
            </button>
            <button class="menu-button" onclick="location.href='planetf.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#128301;&#65039;</div>
                <div class="menu-text">Planet-Position</div>
            </button>
            <button class="menu-button" onclick="location.href='match1.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#128107;&#65039;</div>
                <div class="menu-text">Marriage-Match</div>
            </button>
            <button class="menu-button" onclick="location.href='lagna.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#128344;&#65039;</div>
                <div class="menu-text">Lagna-Antakaala</div>
            </button>
            <button class="menu-button" onclick="location.href='ugadi.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#127800;&#65039;</div>
                <div class="menu-text">Ugadi-Phala</div>
            </button>
            <button class="menu-button" onclick="location.href='kandaya.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#128302;&#65039;</div>
                <div class="menu-text">Kandaaya-Phala</div>
            </button>
            <button class="menu-button" onclick="location.href='grahana.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#127764;&#65039;</div>
                <div class="menu-text">Grahana</div>
            </button>
            <button class="menu-button" onclick="location.href='moudhya.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#127762;&#65039;</div>
                <div class="menu-text">Moudhya</div>
            </button>
            <button class="menu-button" onclick="location.href='mahapata.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#127760;&#65039;</div>
                <div class="menu-text">Mahapata</div>
            </button>
            <button class="menu-button" onclick="location.href='kalsarpa.htm?' + getLang()">
                <div class="menu-icon">&#65039;&#128013;&#65039;</div>
                <div class="menu-text">Kala-Sarpa</div>
            </button>
            <button class="menu-button" onclick="location.href='pushkara.htm?' + getLang()">
                <div class="menu-icon"><span>&#65039;&#127966;&#65039;</span></div>
                <div class="menu-text">Pushkara</div>
            </button>
            <button class="menu-button" onclick="location.href='about.htm?' + getLang()">
                <div class="menu-icon"><span style="color:blue;">&#21328;&#65039;</span></div>
                <div class="menu-text">About-Contact</div>
            </button>
        `;
        report.appendChild(menu);

        const footer = document.createElement("div");
        footer.className = "footer";
        footer.innerHTML = `All Rights Reserved, &copy; ${new Date().getFullYear()} VidyaSankar Jagarlapudi`;
        report.appendChild(footer);
    }

    menuGrid();
};
