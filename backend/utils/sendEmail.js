import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
import mailgun from "mailgun-js"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import mgnodemailer from "nodemailer-mailgun-transport"



dotenv.config()
const DOMAIN = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_APIKEY
const mg = mailgun({ apiKey: apiKey, domain: DOMAIN });

const auth = {
    auth: {
        api_key: apiKey,
        domain: DOMAIN
    }
}

const mgOptions = (from, to, subject, message) => ({
    from: from,
    to: to,
    subject: subject,
    html: message
});

// const mgOptionsWithAttachment = (from, to, subject, message, attachment) => ({
//     from: from,
//     to: to,
//     subject: subject,
//     html: message,
//     attachment: attachment
// });

const mgOptionsWithAttachment = (from, to, subject, message, file) => ({
    from,
    to,
    subject,
    html: message,
    attachments: [
        {
            path: 'text.txt'
        },
    ]
})

// const transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     secure: false,
//     port: 25,
//     auth: {
//         user: process.env.ADMIN_EMAIL,
//         pass: process.env.ADMIN_PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// }))

export const smtpMgTransport = nodemailer.createTransport(smtpTransport({
    service: "Mailgun",
    auth: {
        api_key: apiKey,
        domain: DOMAIN
    }
}));

const mailOptions = (to, subject, message) => {
    return {
        from: 'ifeanyidike87@gmail.com',
        to: to,
        subject: subject,
        html: message
    }
}

const timeNotice = (time) => `
    <div style="background-color: #F2F2F2; margin: 20px 0; padding: 20px">
        This link expires in ${time}. If you need further assistance, please <a
        href="${process.env.CLIENT_URL}/support"
        >Contact us </a>
    </div>
`

const servicesMessageTemplate = (heading = '', msg) => `                 
<html>
    <head>
        <style>
            
        </style>
    </head>
<body>
    <div style="text-align: center">
        <a style="text-decoration: none; 
            color: #0077CC; font-size: 25px; 
            margin-bottom: 5px;font-weight:bold">
            Pin Cafes
        </a>
        <h2 style="margin: 10px 0">${heading}</h2>

        <div style="margin: 20px 0">${msg}</div>    
        

        <small>&copy; ${new Date().getFullYear()} Pin Cafes.</small><br />
        <small>2 John Kay Street, Okitipupa, Ondo State, Nigeria</small> <br />
        <small>
            <a href="${process.env.CLIENT_URL}/legal#privacy">Privacy Policy</a>  |  
            <a href="${process.env.CLIENT_URL}/legal#terms">Terms</a>  |
            <a href="${process.env.CLIENT_URL}/support">Help</a>
        </small>
    </div>
</body>

</html>      
`


const emailMessageTemplate = (heading, msg, url, text, timeNotice = '') => `            
<div style="text-align: center">
    <a style="text-decoration: none; 
        color: #0077CC; font-size: 25px; 
        margin-bottom: 5px;font-weight:bold">
        Pin Cafes
    </a>
    <h2 style="margin: 10px 0">${heading}</h2>
    
    <p style="margin: 20px 0">${msg}</p>
    <a  
        style ="text-decoration: none; 
        background-color: #0077CC; color: #FFFFFF;
        padding: 10px 20px; border-radius: 20px; margin: 20px 0;
        "
        href="${url}">
        ${text}
    </a>       
    
    ${timeNotice}
    
    <small>&copy; ${new Date().getFullYear()} Pin Cafes.</small><br />
    <small>2 John Kay Street, Okitipupa, Ondo State, Nigeria</small> <br />
    <small>
        <a href="${process.env.CLIENT_URL}/legal#privacy">Privacy Policy</a>  |  
        <a href="${process.env.CLIENT_URL}/legal#terms">Terms</a>  |
        <a href="${process.env.CLIENT_URL}/support">Help</a>
    </small>
</div>
`



const emailMessageCardTemplate = (heading, msg, cardbody) => `      

<html>
    <head>
        <style>
            .styled-table {        
                border-collapse: collapse;
                margin: 25px auto;
                font-size: 0.9em;
                font-family: sans-serif;
                min-width: 400px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            .styled-table thead tr {
                background-color: #009879;
                color: #ffffff;
                text-align: left;
            }
            .styled-table th,
            .styled-table td {
                padding: 12px 15px;
            }
            
            .styled-table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }
    
            .styled-table tbody tr:last-of-type {
                border-bottom: 2px solid #009879;
            }
            .styled-table tbody tr.active-row {
                font-weight: bold;
                color: #009879;
            }
        </style>
    </head>
<body>
    <div style="text-align: center">
        <a style="text-decoration: none; 
            color: #0077CC; font-size: 25px; 
            margin-bottom: 5px;font-weight:bold">
            Pin Cafes
        </a>
        <h2 style="margin: 10px 0">${heading}</h2>

        <p style="margin: 20px 0">${msg}</p>    

        <table class="styled-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PIN</th>
                    <th>Serial No.</th>
                    <th>Token</th>
                    </tr>
            </thead>
            <tbody>
                ${cardbody}
            </tbody>
        </table>

        <small>&copy; ${new Date().getFullYear()} Pin Cafes.</small><br />
        <small>2 John Kay Street, Okitipupa, Ondo State, Nigeria</small> <br />
        <small>
            <a href="${process.env.CLIENT_URL}/legal#privacy">Privacy Policy</a>  |  
            <a href="${process.env.CLIENT_URL}/legal#terms">Terms</a>  |
            <a href="${process.env.CLIENT_URL}/support">Help</a>
        </small>
    </div>
</body>

</html>      
`

export {
    mg, mgOptions, emailMessageTemplate, timeNotice, emailMessageCardTemplate,
    servicesMessageTemplate, mgOptionsWithAttachment
}
