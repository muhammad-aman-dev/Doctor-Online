export const globalerrorHandler=async (err,req,res,next) => {
    console.log(`SERVER ERROR: ${err}`)
    res.status(500).send("INTERNAL SERVER ERROR");
}