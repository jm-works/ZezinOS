export const deneasyPage = {
    title: "DeneasyBot - Squad 6",
    date: "December 05, 2025",
    theme: "theme-hypnospace",
    content: `
<center>
    <a href="https://github.com/squad6-deneasybot/deneasy-bot" target="_blank" style="text-decoration: none;" alt="DeneasyBot">
        <img src="https://avatars.githubusercontent.com/u/236934282?s=200&v=4" width="200" style="border: 3px ridge #0f0; margin-bottom: 10px; border-radius: 5px;">
    </a>
    <h1>DeneasyBot - The End of Financial Bureaucracy</h1>
</center>

Welcome to the **DeneasyBot** page, the project that crowns **Squad 6** (mine) as the grand champion of the Software Residency II at Tiradentes University (UNIT)!
Developed in partnership with *Easy Gestão de Negócios*, this system is a robust virtual assistant via WhatsApp that pulls your company's ears and automates financial and corporate chaos.
<br>
---

### The Challenge & The Triumph<br>
The goal was clear: make managers' lives easier by bringing ERP data straight to the palm of their hand on WhatsApp, without boring interfaces. I was responsible for **Back-end** engineering, taming the server to ensure it wouldn't melt down with requests.<br><br>

* **The Title:** We emerged as the champion group. A lot of sweat, sleepless nights, and rivers of coffee converted into clean, functional code.
* <span style="text-decoration: line-through red; text-decoration-thickness: 2px;">**The Disappointment:** Unfortunately, I couldn't hide a Waifu Viewer or generate 2D girls in the report administration panel. The corporate financial market still doesn't have the *mindset* for that... a pity.</span>
<br>
---

### Under the Hood (The Sea of Technologies)<br>
Through the knowledge acquired during the course, we used the most modern tools in the corporate ecosystem:<br><br>

* **Java 21 & Spring Boot (3.5.x):** Structured with Spring Data JPA, Security, and Mail.
* **Webhook Orchestrator (Meta/WhatsApp):** I implemented a complex state machine (\`ChatStateService\`). The bot knows exactly where you left off in the conversation (whether it's waiting for an *App Key*, an email code, or navigating the menu), preventing the flow from going crazy.
* **Omie ERP & Resilience4j Integration:** Massive consumption of financial APIs (Summary, Movements, Categories). We used *Rate Limiting* and *Retry* from Resilience4j to ensure the bot doesn't crash if the ERP API blinks.
* **Cryptographic Security:** Implementation of AES/GCM with a dynamic Salt to shield the company's sensitive credentials in the database. A security system much tighter and impenetrable than Vasco's defense, by the way.
* **Scheduled Jobs (\`@Scheduled\`):** Because machines don't sleep. Cron jobs running at dawn to compile beautiful HTML financial reports and send them directly via Email (Mailtrap/SMTP).
<br>
---

### What Does the Bot Do in Practice?

1. **2-Factor Authentication:** No one accesses the data without receiving and validating a magical 6-digit email code and generating a JWT Token in the WhatsApp session.
2. **Metrics at the Speed of Light:** Cash projections, bills to pay, overdue bills, and a ranking of top expenses directly on your WhatsApp screen.
3. **Team Management (CRUD):** Managers add, update, and remove employee access using only numerical commands in the chat.
4. **Wishlists & Reviews:** A direct feedback system for the company to know where to improve (or just for the user to vent about their personal problems).

<br>
<center>
    <a href="https://github.com/squad6-deneasybot/deneasy-bot" target="_blank" style="text-decoration: none;">
        ACCESS BACK-END REPOSITORY
    </a>
    <br>
    <i>Copyright © 2025 José Matheus & Squad 6. Bureaucracy successfully destroyed.</i>
</center>

<br><br>

<center>
<img src="https://cyber.dabamos.de/88x31/cogs.gif">
</center>
    `
};