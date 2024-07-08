const homeController = (req, res) => {
  res.render('index',{
    'name':"charan",
    id:21,
    marks:[20,30,40,50]
  })
}
export { homeController }
