const groupId = require('./demoVars').groupId;
const articleId = require('./demoVars').articleId;
const entryId = require('./demoVars').entryId;

const { request, gql } = require('graphql-request')

const endpoint = 'http://localhost:8080/o/graphql'

async function getStructuredContentByArticleId(groupId, articleId) {
  const query = gql`
  {
    structuredContentByKey(siteKey: "`+groupId+`", key: "`+articleId+`") {
      contentFields {
        contentFieldValue {
          data
          link
        }
        dataType
        name
        label
        repeatable
      }
    }
  }
`

  try {
    const data = await request(endpoint, query)
    return data
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2))
    process.exit(1)
  }
}


async function getStructuredContentByEntryId(entryId) {
  const query = gql`
  {
    structuredContent(structuredContentId: `+entryId+`) {
      contentFields {
        contentFieldValue {
          data
          link
        }
        dataType
        name
        label
        repeatable
      }
    }
  }
`

  try {
    const data = await request(endpoint, query)
    return data
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2))
    process.exit(1)
  }
}


getStructuredContentByEntryId(entryId).catch((error) => console.error(error)).then(data=>{
  console.debug(JSON.stringify(data))
  document.getElementById("container").innerHTML+="<h3>structuredContent method</h3>"
  for (var i in data.structuredContent.contentFields) {
    let content = data.structuredContent.contentFields[i];
    console.debug(JSON.stringify(content))
    document.getElementById("container").innerHTML+="<span>"+content.label+":"+content.contentFieldValue.data+"</span><br/>"
  }
})

getStructuredContentByArticleId(groupId, articleId).catch((error) => console.error(error)).then(data=>{
  console.debug(JSON.stringify(data))
  document.getElementById("container").innerHTML+="<h3>structuredContentByKey method</h3>"
  for (var i in data.structuredContentByKey.contentFields) {
    let content = data.structuredContentByKey.contentFields[i];
    console.debug(JSON.stringify(content))
    document.getElementById("container").innerHTML+="<span>"+content.label+":"+content.contentFieldValue.data+"</span><br/>"
  }
})