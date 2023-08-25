
const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const admin=require("../models/administrators");
router.post('/sub', async (req, res) => {
    const {email, payment_method,name,
        country,} = req.body;
  console.log(req.body.planId);
    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      name,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price:req.body.planId,quantity:req.body.slots}],
      expand: ['latest_invoice.payment_intent']
    });
    
    const status = subscription['latest_invoice']['payment_intent']['status'] 
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  
    res.json({'client_secret': client_secret, 'status': status,id:subscription['latest_invoice']});
  });

router.get("/plans",async(req,res)=>{
    const products = await stripe.products.list({
        limit: 4,
      });
    
    res.send(products);
});


router.get("/getpaymentmethod",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.query.id});
  console.log(paymentDetails.paymentInfo[0].customer)
    const paymentMethods =  await stripe.paymentMethods.list({
      customer:paymentDetails.paymentInfo[0].customer,
      type: 'card',
    });
    res.send(paymentMethods);


});

router.post('/pay', async (req, res) => {
  const {email} = req.body;
  const paymentDetails= await admin.findOne({_id:req.body.id});

  const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: 'usd',
      automatic_payment_methods: {enabled: true},
      customer:paymentDetails.paymentInfo[0].customer,
   
      // Verify your integration in this guide by including this parameter
      receipt_email: email,
     
    });

    res.json({'client_secret': paymentIntent['client_secret']})
});

router.post("/updatesub",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.body.id});
  const subscriptionItems = await stripe.subscriptionItems.list({
    subscription: paymentDetails.paymentInfo[0].subscription,
  });
  const subscription = await stripe.subscriptions.update(
    paymentDetails.paymentInfo[0].subscription,    {
      items: [
        {
          id:subscriptionItems.data[0].id,
          deleted: true,
        },
        {
        
        price: req.body.price,
        quantity:req.body.members
        },
      ],
    }
  );
  if(subscription){
 const result= await admin.updateOne({_id:req.body.id},{
  subscription:req.body.subs,
  dateStart:new Date().toLocaleDateString()
 })
  res.send(subscription)
  }
  else
  res.status(400).send("Could not update subscription");
});

router.delete("/cancel",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.query.id});
  const trimmed =  paymentDetails.paymentInfo[0].subscription.replace(/(\r\n|\n|\r)/gm, "");

  const subscription = await stripe.subscriptions.update(
    trimmed,
   {
      cancel_at_period_end: true,
    }
  );
  if(subscription)
  {
    console.log(subscription);
   const success= await admin.updateOne({_id:req.query.id},{
      cancelled:true,
      subscription:0
    });
    console.log(success);
    if(success)
    res.send("Successfully cancelled subscription");
  else
  res.status(400).send("Cancellation unsuccessful");
  }
  else
  res.status(400).send("Cancellation unsuccessful");

})



  module.exports=router;