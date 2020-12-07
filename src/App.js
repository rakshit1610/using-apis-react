import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form , Button, Card} from 'react-bootstrap'
import {Component} from 'react'
import Cards from './Card'
import axios from 'axios'

class App extends Component {

  state = { 
    name: "Name",
    location : "Location",
    search: "Search",
    postlist:[],
    heading: "",
    searchactive:false
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
  }

  handlesubmit=(event)=>{
    console.log(this.state.name , this.state.location)
    const data={
      name: this.state.name,
      location: this.state.location
    }
    axios.post('https://testapp-gogaga.herokuapp.com/user/addInfo', data)
    .then(response=>{
      console.log(response);
    })
  }

  handlesearch=(event)=>{
    console.log(this.state.search)

    axios.get('https://testapp-gogaga.herokuapp.com/user/search/'+ this.state.search)
    .then(response=>{
      console.log(response);
      this.setState({postlist: response.data, heading:"Search Results", searchactive: true})
    })
  }

  handleget=(event)=>{
    console.log("all posts here")


    axios.get('https://testapp-gogaga.herokuapp.com/user/getInfo/')
    .then(response=>{
      console.log(response);
      this.setState({postlist: response.data, heading:"All records", searchactive: false})
    })
  }

  render(){

    const postlist= this.state.postlist.map((postlist,index)=>{
      return <Cards name={postlist.name} location={postlist.location} />
      })

      if(this.state.searchactive){

  return (
    <div class="totalwrap">
<div class="topnav">
<a class="active" href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <div class="topnavii">
  <input type="text" onChange={this.handlechangeall} name="search" placeholder={this.state.search}  />
  <button onClick={this.handlesearch} class="sbtn">Search</button>
</div>
</div>


    <div class="boxwrap">

      <Form.Control className="itemsbox" name="name" placeholder= {this.state.name}  onChange={this.handlechangeall} type="text" />
      <Form.Control className="itemsbox" name="location" onChange={this.handlechangeall} type="text" placeholder= {this.state.location} />
      <Button className="itemsbox" variant="primary" onClick={this.handlesubmit} value="submit" type="submit">
      Submit
    </Button>
  </div>
  <Button onClick={this.handleget} className="getbtn" variant="primary" type="submit">
      Get Data
    </Button>
<h2>{this.state.heading}</h2>
{/* <Cards name="Rakshit" location="India"/>
<Cards name="Rakshit" location="USA"/>
<Cards name="Rakshit" location="Canada"/> */}

{postlist}
{this.state.postlist.length ?null: <p>No results found</p>}
  </div>


  );
}

else{
  return (
    <div class="totalwrap">
<div class="topnav">
<a class="active" href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <div class="topnavii">
  <input type="text" onChange={this.handlechangeall} name="search" placeholder={this.state.search}  />
  <button onClick={this.handlesearch} class="sbtn">Search</button>
</div>
</div>


    <div class="boxwrap">

      <Form.Control className="itemsbox" name="name" placeholder= {this.state.name}  onChange={this.handlechangeall} type="text" />
      <Form.Control className="itemsbox" name="location" onChange={this.handlechangeall} type="text" placeholder= {this.state.location} />
      <Button className="itemsbox" variant="primary" onClick={this.handlesubmit} value="submit" type="submit">
      Submit
    </Button>
  </div>
  <Button onClick={this.handleget} className="getbtn" variant="primary" type="submit">
      Get Data
    </Button>
<h2>{this.state.heading}</h2>

{postlist}
{/* {this.state.postlist.length ?null: <p>No results found</p>} */}
  </div>


  );
}

  }
}

export default App;
