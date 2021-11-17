import mongoose  from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req , res ) => {
    try {
        const postMessage = await PostMessage.find()

        res.status(201).json(postMessage)

    } catch (error) {
        console.log({error : error.message })
    }
}

export const createPost = async (req , res ) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
         res.status(409).json({ error: error.message })
    }
}

export const updatePost = async (req , res ) => {

    const { id: _id } = req.params;

    
    const { title, message , creator , selectedFile , tags } = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id')

    
    const updatePost = { creator , title , message , tags , selectedFile ,  _id }; 
    
    await PostMessage.findByIdAndUpdate( _id , updatePost , { new: true } )

    res.json(updatePost)
}

export const deletePost = async (req , res ) => {
    const { id }  = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id')

    await PostMessage.findByIdAndRemove(id);

    res.json( { message : "Post deleted successfully!"})
    

}

export const likePost = async (req , res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id')

    const post = await PostMessage.findById(id)
    const updatePost = await PostMessage.findByIdAndUpdate(id , { likeCount: post.likeCount + 1 } , { new: true })

    res.json(updatePost);
     
}




