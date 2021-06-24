# GraphQL Demonstration with Liferay Headless API

Liferay provides a very useful API to be consumed via REST or GraphQL.
In this example, I'll be demonstrating how to get JournalArticle content from headless using graphQL.

How to use:
1. Clone the repository
2. Run `npm install`
3. Start your liferay at 8080 port
4. Create a web content using a structure
5. Expose JournalArtcle GET API to be public access
   1. Control Panel > Configuration > Service Access Policy
   2. (+) New Service Access Policy
   3. Define a name (without white spaces) > Set Enable TRUE > Set Default TRUE > Define a Title > Click on Switch to Advenced Mode.
   4. Paste this configuration:
        ```
        com.liferay.headless.admin.user.internal.resource.v1_0.SiteResourceImpl#getSite
        com.liferay.headless.delivery.internal.resource.v1_0.StructuredContentResourceImpl#getSiteStructuredContentByKey
        com.liferay.journal.service.JournalArticleService#getArticle
        com.liferay.journal.service.JournalArticleService#getLatestArticle
        ```
6. Edit `demoVars.js` file and set your groupId, articleId and entryId.
   1. Headless API provides getters by `groupId + articleId` but also provides by `entryId`.
   2. In this example we''ve covered both scenarios
7. Run `browserify index.js > build/main.js`
8. Open `index.html` in your browser

Done! You must be seeing your journalArticle content in your page.

Obs:
* It uses `graphql-request` npm package to make graphQL requests easily
* It encapsulates graphQL requests in async functions to handle exceptions easily
* It uses some few Liferay API fields, just for demonstration purposes
* A complete documentation of Liferay Headless API can be found in your own Liferay instance: http://localhost:8080/o/api