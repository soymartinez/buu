import { createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export async function sendVerification(params: {
    email: string
    url: string
    provider: {
        server: string | SMTPTransport.Options
        from: string | undefined
    }
}) {
    const { url, provider: { server, from }, email } = params
    const { host } = new URL(url)
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(server)
    const result = await transport.sendMail({
        to: email,
        from: from || `no-reply@${host}`,
        subject: `Inicio de sesión en Buu`,
        text: text({ url, host }),
        html: html({ url, host, email }),
    })

    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string, host: string, email: string }) {
    const { url, host, email } = params

    // const escapedHost = host.replace(/\./g, "&#8203;.")
    // const escapeEmail = email.replace(/@/g, "&#8203;@")

    const colorTextTitle = "#222222"
    const colorTextSubtitle = "#9798A4"
    const buttonBackground = "#2524d1"
    const buttonTextColor = "#ffffff"

    return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">    
        <head>
            <title>
            </title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
            
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
            
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
            
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
            
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if mso]>
                    <noscript>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    </noscript>
                    <![endif]-->
            <!--[if lte mso 11]>
                    <style type="text/css">
                    .mj-outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                }
            </style>
            <style media="screen and (min-width:480px)">
                .moz-text-html .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    table.mj-full-width-mobile {
                        width: 100% !important;
                    }
                
                    td.mj-full-width-mobile {
                        width: auto !important;
                    }
                }
            </style>
        </head>
        
        <body style="word-spacing: normal;">
            <div style="">
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px;" width="600" ><tr><td style="line-height: 0; font-size: 0; mso-line-height-rule: exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
                <div style="margin: 0 auto; max-width: 600px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                        <tr style="vertical-align: top;">
                            <td style="background: ${buttonTextColor}; background-position: center center; background-repeat: no-repeat; padding: 40px; vertical-align: top;" height="-80">
                                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width: 600px;" width="600" ><tr><td style=""><![endif]-->
                                <div class="mj-hero-content" style="margin: 0px auto;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; margin: 0px;">
                                        <tr>
                                            <td style="">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; margin: 0px;">
                                                    <tr>
                                                        <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width: 110px;">
                                                                            <img height="auto" src="https://user-images.githubusercontent.com/72507996/209621105-e8d0db88-efa7-4fc4-873e-74b691b57f49.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="110" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height: 0px; font-size: 0px; mso-line-height-rule: exactly;"><![endif]-->
                <div style="margin: 0px auto; max-width: 600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="direction: ltr; font-size: 0px; padding: 40px; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align: top; width: 520px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" style="font-size: 0px; padding: 10px 25px; padding-bottom: 30px; word-break: break-word;">
                                                        <div style="font-family: Montserrat; font-size: 29px; font-weight: 700; line-height: 1; text-align: left;color: ${colorTextTitle};">Verifique su correo electrónico</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="font-size: 0px; padding: 10px 25px; padding-bottom: 60px; word-break: break-word;">
                                                        <div style="font-family: Montserrat; font-size: 18px; font-weight: 400; line-height: 27px; text-align: left;color: ${colorTextSubtitle};">Utilice el siguiente enlace para verificar su dirección de correo electrónico.</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" vertical-align="middle" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; width: 100%; line-height: 100%;">
                                                            <tr>
                                                                <td align="center" bgcolor="${buttonBackground}" role="presentation" style="border: none; border-radius: 6px; cursor: auto; mso-padding-alt: 25px; background: ${buttonBackground};" valign="middle">
                                                                    <a href="${url}" style="display: inline-block; background: ${buttonBackground}; color: ${buttonTextColor}; font-family: Montserrat; font-size: 22px; font-weight: 500; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 25px; mso-padding-alt: 0px; border-radius: 6px;" target="_blank">
                                                                        ¡Iniciar sesión!
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="font-size: 0px; padding: 10px 25px; padding-top: 30px; word-break: break-word;">
                                                        <div style="font-family: Montserrat; font-size: 11px; font-weight: 500; line-height: 1; text-align: left; color: ${colorTextSubtitle};"> Si no solicitó este correo electrónico, puede ignorarlo con seguridad. </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
            </div>
        </body>
    </html>
    `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
    return `Inicio de sesión en Buu ${host}\n${url}\n\n`
}