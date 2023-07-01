
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
const Demo11 = () => {
    const [CustomData1, setCustomData1] = useState([])
   const[currentpage1,setCurrentPage1]=useState(1)
   const recordpage1=4;
   const Lastindex1 = currentpage1*recordpage1;
   const Firstindex1 = Lastindex1-recordpage1;
   const records1 =CustomData1.slice(Firstindex1,Lastindex1);
   const npage1= Math.ceil(CustomData1.length/recordpage1) 
   const numbers1=[...Array(npage1+1).keys()].slice(1)
    useEffect(() => {
        get()

    }, [])
    const get = () => {

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/`, {
            method: 'GET',
            // credentials: 'same-origin',
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
             
                console.log('RESPONS get api-------------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        id: Response[i].id,
                        task: Response[i].task,
                        description: Response[i].description,
                        pyname: Response[i].pyname,
                        inactive: Response[i].inactive,
                        notes: Response[i].notes,

                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData1(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    
    const chnacPage1 =(pageNo)=>{
        setCurrentPage1(pageNo);
        const startIndex = (pageNo - 1) * recordpage1;
        const pagined = (CustomData1).slice(startIndex).take(recordpage1).value();
        setCurrentPage1(pagined)
    }
   

    return <>
    
        <section>
            <div className="container-fluid">
                <div className="task-table">
                    <div class="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Pyname</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records1.map((item, index) => (
                                    <tr key={index} >
                                        <td>
                                            {item.task}
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            {item.pyname}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </section>


<nav>
    <ul className='pagination'>
       
        {
            numbers1.map((nn,ii)=>(
<li className={`page-link ${currentpage1 === nn ? 'active':""}`} key={ii}>
    <a  onClick={()=>chnacPage1(nn)}>{nn}</a>
</li>
            ))
        }
        

    </ul>
</nav>


    </>;
};

export default Demo11;