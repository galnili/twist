// בדיקת שדות החובה ועדכון התמונות, ההנחיה וכפתור הסיום
function checkForm() {
    // הצגת ההנחיה למילוי שדות החובה בתחילת הבדיקה
    document.getElementById("formMessage").style.display = "block";
    // נטרול כפתור הסיום לפני בדיקת שדות החובה
    document.getElementById("orderButton").disabled = true;
    // קליטת שם הקוקטייל מתיבת הטקסט ושמירתו במשתנה
    const cocktailName = document.getElementById("cocktailName").value;
    // שמירת מצב הבדיקה: האם נמצא בשם תו שאינו רווח
    let hasName = false;
    // מעבר על תווי שם הקוקטייל לצורך בדיקת התוכן
    for (let i = 0; i < cocktailName.length; i++) {
        // בדיקה אם התו הנוכחי אינו רווח
        if (cocktailName[i] !== " ") {
            // עדכון שנמצא בשם תו שאינו רווח
            hasName = true;
        }
    }
    // קבלת כפתורי הרדיו לצורך בדיקת הבחירה
    const checkCocktailRadio = document.getElementsByClassName("cocktailRadio");
    // הפעלת עדכון הבקבוקים ושמירת התשובה האם נבחר בסיס
    const isBaseSelected = showBottle(checkCocktailRadio);
    // קבלת תיבות הסימון של התוספות והקישוטים
    const extraCheckboxes = document.getElementsByClassName("extraCheckbox");
    // העברת תיבות הסימון לפונקציה שמעדכנת את שקיפות התמונות
    showExtras(extraCheckboxes);
    // קליטת המשקה שנבחר ברשימת הערבובים
    const mixer = document.getElementById("mixer").value;
    // הצגת המשקה שנבחר לערבוב באזור התצוגה בצד
    document.getElementById("mixerPreview").innerHTML = "לערבוב: " + mixer;
    // בדיקה שהשם מכיל לפחות תו אחד שאינו רווח
    if (hasName === true) {
        // בדיקה אם הפונקציה החזירה שנבחר בסיס
        if (isBaseSelected === true) {
            // הפעלת כפתור הסיום לאחר שהוזן שם ונבחר בסיס
            document.getElementById("orderButton").disabled = false;
            // הסתרת ההנחיה לאחר שהוזן שם ונבחר בסיס
            document.getElementById("formMessage").style.display = "none";
        }
    }
}

// קבלת אוסף כפתורי הרדיו, עדכון הבקבוקים והחזרת מצב הבחירה
function showBottle(checkCocktailRadio) {
    // הגדרת משתנה במצב false בתחילת הבדיקה, false מייצג שעדיין לא נמצא בסיס מסומן
    let baseSelected = false;
    // מעבר על כפתורי הרדיו לצורך זיהוי הבקבוק שנבחר
    for (let i = 0; i < checkCocktailRadio.length; i++) {
        // שמירת מזהה סוג הבקבוק שמתאים לכפתור הרדיו במיקום i
        const bottleId = checkCocktailRadio[i].value;
        // בדיקה אם כפתור הרדיו במיקום i מסומן
        if (checkCocktailRadio[i].checked === true) {
            // עדכון מצב הבחירה לאחר שנמצא בסיס מסומן
            baseSelected = true;
            // הצגת אזור הבקבוק שהמזהה שלו שמור במשתנה bottleId
            document.getElementById(bottleId).style.display = "block";
            // הסתרת הבקבוק הגנרי לאחר בחירת בסיס
            document.getElementById("genericBottle").style.display = "none";
        }
        else {
            // הסתרת אזור הבקבוק שכפתור הרדיו שלו אינו מסומן
            document.getElementById(bottleId).style.display = "none";
        }
    }
    // החזרת התשובה האם נמצא בסיס מסומן
    return baseSelected;
}

// עדכון שקיפות תמונות התוספות והקישוטים לפי הסימונים
function showExtras(extraCheckboxes) {
    // מעבר על תיבות הסימון של התוספות והקישוטים
    for (let i = 0; i < extraCheckboxes.length; i++) {
        // שמירת מזהה התמונה שמתאימה לתיבת הסימון במיקום i
        const extraId = extraCheckboxes[i].value;
        // בדיקה אם תיבת הסימון במיקום i מסומנת
        if (extraCheckboxes[i].checked === true) {
            // הצגת תמונת הפריט המסומן באטימות מלאה
            document.getElementById(extraId).style.opacity = 1;
        }
        else {
            // החזרת תמונת הפריט למצב דהוי כאשר אינו מסומן
            document.getElementById(extraId).style.opacity = 0.5;
        }
    }
}

// פתיחת חלון הסיום להצגת הקוקטייל
function openPopup() {
    // בדיקה חוזרת לפני הצגת הסיכום
    checkForm();
    if (document.getElementById("orderButton").disabled === true) {
        return;
    }
    // קליטת שם הקוקטייל לצורך הצגתו בחלון הסיום
    const cocktailName = document.getElementById("cocktailName").value;
    // הצגת שם הקוקטייל בחלון הסיום
    document.getElementById("popupName").textContent = "שם הקוקטייל: " + cocktailName;
    // קבלת כפתורי הרדיו לצורך הצגת הבסיס שנבחר בחלון הסיום
    const checkCocktailRadio = document.getElementsByClassName("cocktailRadio");
    // שמות הבסיסים לפי סדר כפתורי הרדיו בטופס
    const baseName = ["וודקה", "ג'ין", "רום"];
    // שמירת שם הבסיס שנבחר לצורך בחירת תמונת המשקה
    let selectedBase = "";
    // מעבר על כפתורי הרדיו לצורך איתור הבסיס שנבחר
    for (let i = 0; i < checkCocktailRadio.length; i++) {
        // בדיקה אם כפתור הרדיו במיקום i מסומן
        if (checkCocktailRadio[i].checked === true) {
            // שמירת שם הבסיס שמתאים לכפתור הרדיו המסומן
            selectedBase = baseName[i];
            // הצגת שם הבסיס שמתאים לכפתור הרדיו המסומן
            document.getElementById("popupBase").textContent = "בסיס: " + baseName[i];
        }
    }
    // קליטת המשקה שנבחר לערבוב לצורך הצגתו בחלון הסיום
    const mixer = document.getElementById("mixer").value;
    // הצגת המשקה שנבחר לערבוב בחלון הסיום
    document.getElementById("popupMixer").textContent = "לערבוב: " + mixer;
    // הצגת המשקה השקוף כברירת מחדל בחלון הסיום
    document.getElementById("clearGlass").style.opacity = 1;
    // הסתרת תמונת המשקה הזהוב מהבחירה הקודמת
    document.getElementById("rumGlass").style.opacity = 0;
    // הסתרת תמונת הלימונדה מהבחירה הקודמת
    document.getElementById("lemonadeGlass").style.opacity = 0;
    // בדיקה אם המשקה שנבחר לערבוב הוא לימונדה
    if (mixer === "לימונדה") {
        // הסתרת תמונת המשקה השקוף
        document.getElementById("clearGlass").style.opacity = 0;
        // הצגת תמונת הלימונדה
        document.getElementById("lemonadeGlass").style.opacity = 1;
    }
    // בדיקה אם המשקה שנבחר לערבוב הוא רדבול
    else {
        if (mixer === "רדבול") {
            // הסתרת תמונת המשקה השקוף
            document.getElementById("clearGlass").style.opacity = 0;
            // הצגת תמונת המשקה הזהוב
            document.getElementById("rumGlass").style.opacity = 1;
        }
    }
    // בדיקה אם לא נבחר משקה לערבוב
    if (mixer === "ללא ערבוב") {
        // בדיקה אם הבסיס שנבחר הוא רום
        if (selectedBase === "רום") {
            // הסתרת תמונת המשקה השקוף
            document.getElementById("clearGlass").style.opacity = 0;
            // הצגת תמונת הרום כאשר לא נבחר ערבוב
            document.getElementById("rumGlass").style.opacity = 1;

        }
    }
    // קבלת תיבות הסימון לצורך הצגת התוספות והקישוטים בסיכום
    const extraCheckboxes = document.getElementsByClassName("extraCheckbox");
    // שמות התוספות והקישוטים לפי סדר תיבות הסימון בטופס
    const extraName = ["לימון", "נענע", "פירות יער", "שפת סוכר", "מטריית קוקטייל"];
    // מזהי תמונות התוספות והקישוטים בחלון הסיום, לפי סדר תיבות הסימון
    const finalImages = ["finalLemon", "finalMint", "finalBerries", "finalSugar", "finalUmbrella"];
    // שמירת הטקסט של התוספות שנבחרו
    let extraText = "";
    // שמירת הטקסט של הקישוטים שנבחרו
    let decorationText = "";
    // מעבר על תיבות הסימון לצורך איסוף שמות הפריטים שנבחרו
    for (let j = 0; j < extraCheckboxes.length; j++) {
        // בדיקה אם תיבת הסימון במיקום j מסומנת
        if (extraCheckboxes[j].checked === true) {
            // הצגת תמונת הפריט שנבחר על הקוקטייל בחלון הסיום
            document.getElementById(finalImages[j]).style.opacity = 1;
            // בדיקה אם הפריט המסומן הוא תוספת ולא קישוט
            if (j < 3) {
                // בדיקה אם כבר נשמרה תוספת בטקסט, כדי להפריד בין השמות בפסיק
                if (extraText !== "") {
                    // הוספת פסיק ורווח אחרי התוספות שכבר נשמרו
                    extraText += ", ";
                }
                // הוספת שם התוספת שנבחרה לטקסט
                extraText += extraName[j];
            }
            // איסוף שם הקישוט שנבחר לטקסט הקישוטים
            else {
                // בדיקה אם כבר נשמר קישוט בטקסט
                if (decorationText !== "") {
                    // הוספת פסיק ורווח אחרי הקישוטים שכבר נשמרו
                    decorationText += ", ";
                }
                // הוספת שם הקישוט שנבחר לטקסט
                decorationText += extraName[j];
            }
        }
        else {
            // הסתרת תמונת הפריט שאינו מסומן בחלון הסיום
            document.getElementById(finalImages[j]).style.opacity = 0;
        }
    }
    // בדיקה אם לא נבחרה אף תוספת
    if (extraText === "") {
        // שמירת טקסט מתאים למצב שבו לא נבחרו תוספות
        extraText = "ללא תוספות";
    }
    // בדיקה אם לא נבחר אף קישוט
    if (decorationText === "") {
        // שמירת טקסט מתאים למצב שבו לא נבחרו קישוטים
        decorationText = "ללא קישוטים";
    }
    // הצגת התוספות שנבחרו בחלון הסיום
    document.getElementById("popupExtras").textContent = "תוספות: " + extraText;
    // הצגת הקישוטים שנבחרו בחלון הסיום
    document.getElementById("popupDecorations").textContent = "קישוטים: " + decorationText;
    // הצגת חלון הסיום
    document.getElementById("finishPopup").style.display = "block";
    document.getElementById("closePopup").focus();
}

// סגירת חלון הסיום וחזרה לטופס
function closePopup() {
    // הסתרת חלון הסיום
    document.getElementById("finishPopup").style.display = "none";
    document.getElementById("orderButton").focus();
}

// איפוס הבחירות בטופס והחזרת התצוגה למצב ההתחלתי
function resetForm() {
    // ניקוי שם הקוקטייל
    document.getElementById("cocktailName").value = "";
    // החזרת רשימת הערבובים לאפשרות ללא ערבוב
    document.getElementById("mixer").value = "ללא ערבוב";
    // קבלת כפתורי הרדיו לצורך ביטול בחירת הבסיס
    const checkCocktailRadio = document.getElementsByClassName("cocktailRadio");
    // מעבר על כפתורי הרדיו לצורך ביטול הבחירה
    for (let c = 0; c < checkCocktailRadio.length; c++) {
        // ביטול הסימון של כפתור הרדיו במיקום c
        checkCocktailRadio[c].checked = false;
    }
    // קבלת תיבות הסימון לצורך ביטול בחירת התוספות והקישוטים
    const extraCheckboxes = document.getElementsByClassName("extraCheckbox");
    // מעבר על תיבות הסימון לצורך ביטול הבחירה
    for (let e = 0; e < extraCheckboxes.length; e++) {
        // ביטול הסימון של תיבת הסימון במיקום e
        extraCheckboxes[e].checked = false;
    }
    // עדכון התצוגה וכפתור הסיום לאחר איפוס השדות
    checkForm();
    // הצגת הבקבוק הגנרי לאחר איפוס הבחירות
    document.getElementById("genericBottle").style.display = "block";
}

// בחלון יש כפתור אחד: Tab שומר עליו מיקוד ו-Escape חוזר לטופס.
function popupKeyboard(event) {
    if (event.key === "Escape") {
        closePopup();
    }
    if (event.key === "Tab") {
        event.preventDefault();
        document.getElementById("closePopup").focus();
    }
}

// התאמת התצוגה גם לערכים שהדפדפן שחזר בטעינת העמוד.
checkForm();
