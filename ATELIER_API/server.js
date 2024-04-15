import e from"express";import t from"dotenv";import s from"mongoose";import r from"cors";import o from"cookie-parser";import a from"bcrypt";import n from"jsonwebtoken";import i from"./users.model.js";import d from"./articles.model.js";t.config();let env={port:process.env.PORT,token:process.env.TOKEN,mongoURI:process.env.MONGO_URI},post=async(e,t)=>{try{let s=await d.create({...e.body});t.status(201).json({message:"Article has been created!'",article:s})}catch(r){console.log(r)}},getArticle=async(e,t)=>{try{let s=await d.find();t.status(200).json(s)}catch(r){console.log(r)}},getArticleById=async(e,t)=>{try{let s=await d.findById(e.params.id);t.status(200).json(s)}catch(r){console.log(r)}},deleteArticle=async(e,t)=>{checkIdArticle(e,t);try{let s=await d.findByIdAndDelete(e.params.id);if(!s)return t.status(404).json("Article not found !");t.status(200).json("articleDeleted")}catch(r){console.log(r)}},updateArticle=async(e,t)=>{checkIdArticle(e,t);try{let s=await d.findByIdAndUpdate(e.params.id,{$set:e.body},{new:!0});if(!s)return t.status(404).json("Article not found");t.status(200).json({message:"Article updated",updateArticle:s})}catch(r){console.log(r)}},checkIdArticle=(e,t)=>{let s=e.params.id.length;if(s>24||s<24)return t.status(404).json("Article not found !")},signup=async(e,t)=>{try{let s=await a.hash(e.body.password,10),r=await i.create({...e.body,password:s});t.status(201).json({message:"'User has been created!'",user:r})}catch(o){console.log(o)}},sign=async(e,t)=>{try{let s=await i.findOne({email:e.body.email});if(!s)return t.status(404).json("User not found !");let r=await a.compare(e.body.password,s.password);if(!r)return t.status(400).json("Wrong Credentials!");let o=n.sign({id:s._id},env.token,{expiresIn:"24h"}),{password:d,...c}=s._doc;t.cookie("access_token",o,{httpOnly:!0}).status(200).json(c)}catch(l){console.log(l)}},getUsers=async(e,t)=>{try{let s=await i.find();t.status(200).json(s)}catch(r){console.log(r)}},getUserById=async(e,t)=>{try{let s=await i.findById(e.params.id);t.status(200).json(s)}catch(r){console.log(r)}},deleteUser=async(e,t)=>{checkId(e,t);try{let s=await i.findByIdAndDelete(e.params.id);if(!s)return t.status(404).json("User not found !");t.status(200).json("userDeleted")}catch(r){console.log(r)}},updateUser=async(e,t)=>{checkId(e,t);try{let s=await i.findByIdAndUpdate(e.params.id,{$set:e.body},{new:!0});if(!s)return t.status(404).json("User not found");t.status(200).json({message:"User updated",updateUser:s})}catch(r){console.log(r)}},checkId=(e,t)=>{let s=e.params.id.length;if(s>24||s<24)return t.status(404).json("User not found !")},routerUser=e.Router();routerUser.post("/signup",signup),routerUser.post("/sign",sign),routerUser.get("/get",getUsers),routerUser.get("/get/:id",getUserById),routerUser.delete("/delete/:id",deleteUser),routerUser.put("/update/:id",updateUser);let routerArticle=e.Router();routerArticle.post("/add",post),routerArticle.get("/get",getArticle),routerArticle.get("/get/:id",getArticleById),routerArticle.delete("/delete/:id",deleteArticle),routerArticle.put("/update/:id",updateArticle);let app=e(),PORT=env.port||8080;s.connect(env.mongoURI,{dbName:"ee"}).then(()=>console.log("Connexion \xe0 MongoDB r\xe9ussie !")).catch(e=>console.log(e)),app.use(e.json()),app.use(r()),app.use(o()),app.use("/api/user",routerUser),app.use("/api/article",routerArticle),app.listen(PORT,()=>{console.log(`LISTENING AT http://localhost:${PORT}`)});