import React, { useEffect, useState } from 'react'
import style from './Form.module.css'
import axios from 'axios'

const Form = () => {

    const [name, setname] = useState('')
    const [author, setauthor] = useState('')
    const [journal, setjournal] = useState('')
    const [price, setprice] = useState('')
    const [description, setdescription] = useState('')
    const [rating, setrating] = useState('')
    const [error, seterror] = useState([])
    const [data, setdata] = useState([])
    const [search,setsearch] = useState('')
    const [id, setId] = useState()


    const validate = () => {
        const newError = {}
        if (!name.trim()) {
            console.log("Book Name is required")
            newError.name = "Book Name is required"
        }
        if (!author.trim()) {
            console.log("Book author name is required")
            newError.author = "Book author name is required"
        }
        if (!journal.trim()) {
            console.log("Book journal Name is required")
            newError.journal = "Book journal Name is required"
        }
        if (!price.trim()) {
            console.log("Book Price is required")
            newError.price = "Book Price is required"
        }
        else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            console.log("Enter the price value")
            newError.price = "Enter the price value"
        }
        if (!description.trim()) {
            console.log("Book description is required")
            newError.description = "Book description is required"
        }
        if (!rating.trim()) {
            console.log("Book Rating is required")
            newError.rating = "Book Rating is required" 
        }
        else if (rating < 1 || rating > 5) {
            newError.rating = "Rating must be between 1 and 5";
        }
        seterror(newError)

        return Object.keys(newError).length === 0;
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        console.log("Form submitted Successfully")
        const newData = {
            Book_name: name,
            Book_author: author,
            Book_journal: journal,
            Book_price: price,
            Book_description: description,
            Book_rating: rating
        }
        try {
            const res = await axios.post('https://booksbackend-d11z.onrender.com/api/book/create', newData)
            console.log(res.data)
            // getdata()
        }
        catch (err) { 
            console.log(err)
        }
        setname('')
        setauthor('')
        setjournal('')
        setprice('')
        setdescription('')
        setrating('')
    }

    
    
    const getdataid = async (id) => {
        try {
            const res = await axios.get(`https://booksbackend-d11z.onrender.com/api/book/getdata/${id}`)

            console.log(res.data.data)
            setname(res.data.data.Book_name)
            setauthor(res.data.data.Book_author)
            setjournal(res.data.data.Book_journal)
            setprice(res.data.data.Book_price)
            setdescription(res.data.data.Book_description)
            setrating(res.data.data.Book_rating)
                
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getdata = async () => {
        try {
            const res = await axios.get(`https://booksbackend-d11z.onrender.com/api/book/fetched?search=${search}`)
            setdata(res.data.data)
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
        getdata()
    }, [search])

    const [isedit, setisedit] = useState(false)

    const updatedata = async () => {
        const newData = {
            Book_name: name,
            Book_author: author,
            Book_journal: journal,
            Book_price: price,
            Book_description: description,
            Book_rating: rating
        }

        try {
            const res = await axios.put(`https://booksbackend-d11z.onrender.com/api/book/upadte/${id}`,newData)
            console.log(res.data)
            setId('')
            setisedit(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const clickedit = (id) => {
        setId(id)
        setisedit(true)
        getdataid(id)
    }
   
    const deletedata = async(id) => {
        try{
            const res =  await axios.delete(`https://booksbackend-d11z.onrender.com/api/book/deletedata/${id}`)
            console.log(res.data)
            // getdata()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className={style.wholeclass}>
            <div className={style.formclass}>
                <div className={style.inform}>
                    <form className={style.hint}>
                        <input type="text" placeholder='Enter the Book Name' value={name} onChange={(e) => setname(e.target.value)} />
                        {error.name ? <p>{error.name}</p> : ''}
                        <input type="text" placeholder='Enter the Book Author Name' value={author} onChange={(e) => setauthor(e.target.value)} />
                        {error.author ? <p>{error.author}</p> : ''}
                        <input type="text" placeholder='Enter the Book journal Name' value={journal} onChange={(e) => setjournal(e.target.value)} />
                        {error.journal ? <p>{error.journal}</p> : ''}
                        <input type="text" placeholder='Enter the Book Price' value={price} onChange={(e) => setprice(e.target.value)} />
                        {error.price ? <p>{error.price}</p> : ''}
                        <input type="text" placeholder='Enter the Book Description' value={description} onChange={(e) => setdescription(e.target.value)} />
                        {error.description ? <p>{error.description}</p> : ''}
                        <input type="text" placeholder='Enter the Book Rating' value={rating} onChange={(e) => setrating(e.target.value)} />
                        {error.rating ? <p>{error.rating}</p> : ''}
                        <div className={style.main}>
                            {isedit ?
                                <button  onClick={updatedata}>Edit</button>
                                :
                                <button type='submit' onClick={handlesubmit}>Submit</button>
                            }

                        </div>
                    </form>
                </div>
            </div>
            <div className={style.search}>
                <div className={style.fill}>
                        <input type="text" placeholder='Enter to serach value' value={search} onChange={(e)=>setsearch(e.target.value)}/>
                </div>
            </div>
            <div className={style.tableclass}>
                <div className={style.firstclass}>
                    <table>
                        <thead>
                            <tr>
                                <td>Book_name</td>
                                <td>Book_author</td>
                                <td>Book Image</td>
                                <td>Book_journal</td>
                                <td>Book_price</td>
                                <td>Book_description</td>
                                <td>Book_rating</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.Book_name}</td>
                                    <td>{item.Book_author}</td>
                                    <td>
                                    <div className={style.imagediv}><img src={item.image} alt="" /></div>
                                    </td>
                                    <td>{item.Book_journal}</td>
                                    <td>{item.Book_price}</td>
                                    <td>{item.Book_description}</td>
                                    <td>{item.Book_rating}</td>
                                    <td><i class="fa-solid fa-pen-to-square" onClick={() => clickedit(item.id)}></i></td>
                                    <td onClick={() => deletedata(item.id)}><i class="fa-solid fa-trash"></i></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Form
