// const queue=require('../config/kue');
// const commentsMailer=require('../controllers/mailers/comments_mailer');
// //Every queue has atleast worker that has work to run this code again when something happen(coment add)
// queue.process('email',function(job,done){
//     console.log('email worker is processing a job',job.data);
//     commentsMailer.newComment(job.data);
//     done();
// }) 