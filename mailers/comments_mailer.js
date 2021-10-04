const nodemailer = require('../config/nodemailer');
const Comment=require('../models/comment');
const Post=require('../models/post');
const Like=require('../models/like');

// this is another way of exporting a method
exports.newComment = (comment) => 
{
    let htmlString = nodemailer.renderTemplate({comment: comment}, 'views/mailers/comments/new_comment.ejs');
    console.log('Inside newComment Mailer',comment);
    //comment=comment.populate("user","email").execPopulate();
    nodemailer.transporter.sendMail
    (
        {
            from: 'dakshy406@gmail.com',
            to: comment.user.email,
            subject: "New Comment Published!",
            html: '<h1>Hi hello</h1>'
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            console.log('Message sent', info);
            return;
        }
    );
}

// exports.newCommentOnPost = (comment) => 
// {
//     let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment_on_post.ejs');
//     console.log('Inside newCommentOnPost Mailer');

//     nodemailer.transporter.sendMail
//     (
//         {
//             from: 'dakshcoder46@gmail.com',
//             to: comment.post.user.email,
//             subject: "New Comment on your Post!",
//             html: htmlString
//         },
//         (err, info) =>
//         {
//             if(err)
//             {
//                 console.log('Error in sending mail', err);
//                 return;
//             }
//             console.log('Message sent', info);
//             return;
//         }
//     );
// }