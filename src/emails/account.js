const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)
const email1 = "piro99@hotmail.com"
const email2 = 'pierreadelkamel@gmail.com'
const sendWelcomeEmail = (email, name) => {
    
    const msg = {
        to: email,
        from: email1,
        subject: 'Thanks for joining us!',
        Text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    
    }
    sgMail.send(msg)

}
 
 const sendCancelEmail= (email, name) => {
     const msg = {
        to: email,
        from: email1,
        subject: "We are so sad to let you go!",
        Text: `Please come back, ${name} :(`

     }
     sgMail.send(msg)
 }
/*  const sendSpamEmail= () => {
   
    const msg = {
       to: email1,
       from: 'pierreadelkamel@gmail.com',
       subject: "Spam",
       Text: `Spam`

    }
    for (i = 0; i < 10; i++) {
        sgMail.send(msg).then(() => {}).catch((error) => {console.log(error.response.body)} )
      }
    
} */

module.exports = {
      sendWelcomeEmail,
      sendCancelEmail
  }