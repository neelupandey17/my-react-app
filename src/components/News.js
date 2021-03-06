import React from "react";
import axios from "axios";
export default class News extends React.Component {

  
  constructor() {
    super();
    this.state = {
        username: "",
        check1:0,
        check2:0,
        check3:0,
        mData: [{username: "ABC", check1: "1", check2: "0", check3: "1" }, {username: "test", check1: "1", check2: "1", check3: "1" }, {username: "XYZ", check1: "0", check2: "0", check3: "1" }, {username: "123", check1: "1", check2: "0", check3: "0" }, ],
        found: false,
        showsubmit: false,
    };
    
  }

  componentDidMount(){

  }


  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(state);
  }

  onClickuser = (e) => {
    this.setState({check1: 0, check2: 0, check3: 0, found:false, showsubmit:false})
    const username = this.state.username
    var data = this.state.mData;
    for(var k in data){
        var obj = data[k];
        if(obj.username === username){
            //console.log("Found");
            this.setState({check1: obj.check1, check2: obj.check2, check3: obj.check3, found:true, showsubmit:true})
        }else{
            //console.log("Available");
        }
    }
    this.setState({showsubmit:true})
  }

  
  onChangecb = (e) => {
    const state = this.state
    if (e.target.checked) {
      state[e.target.name] = e.target.value;
    } else {
      state[e.target.name] = 0;
    }
    this.setState(state);
  }


    
onSubmit = (e) => {
    e.preventDefault();
    const { username,check1,check2,check3,found  } = this.state;
    if(found){
        var temp_ar = {check1: check1, check2: check2, check3: check3}
        const fData = this.state.mData.map((data, sidx) => {
          if (data.username !== username) return data;
          return { ...data, ...temp_ar};
        });
        console.log(fData);
        this.setState({ mData: fData, username: "",check1:0,check2:0,check3:0, found: false, showsubmit: false });
    }else{ 
        this.setState({ mData: this.state.mData.concat([{ username: username, check1: check1, check2: check2, check3: check3  }]), username: "",check1:0,check2:0,check3:0, found: false, showsubmit: false });
    }
    console.log(this.state)
    alert("Successfully Saved");
  }

onCancel = (e) => {
    e.preventDefault();
    this.setState({username: "",check1:0,check2:0,check3:0, found: false, showsubmit: false})
  }
  render() {
    const { username,check1,check2,check3 } = this.state;

    return (
      <div id="content">
        
        <form  noValidate="novalidate" onSubmit={this.onSubmit}>

                        <fieldset style={{padding: "30px"}}>
                            <section className="col col-3">
                                <label className="label">Username :</label>
                                <label className="input">
                                {" "}
                                <input style={{height: "36px", width: "300px"}} type="text" name="username" value={username} placeholder="Username"  onChange={this.onChange} />
                                {" "}
                                </label> 
                                <span onClick={(e) => this.onClickuser(e)} style={{fontSize: "18px", backgroundColor: "#008116", color: "white", padding: "3px", borderRadius: "3px", cursor: "pointer"}}>Check User</span>                             
                                {this.state.found ? <span style={{color:"green"}}> &nbsp;User found</span> : ""}
                            </section>

                            <section style={{marginTop: "10px"}}>
                                <label className="toggle" style={{fontSize: "24px"}}>
                                    <input style={{ width: "20px", height: "20px"}} type="checkbox" name="check1" value={1} checked={check1 > 0 ? true : false} onChange={this.onChangecb} />
                                    <span>Check 1</span>
                                </label>
                            </section>

                            <section>
                                <label className="toggle" style={{fontSize: "24px"}}>
                                    <input style={{ width: "20px", height: "20px"}} type="checkbox" name="check2" value={1} checked={check2 > 0 ? true : false} onChange={this.onChangecb} />
                                    Check 2
                                </label>
                            </section>

                            <section>
                                <label className="toggle" style={{fontSize: "24px"}}>
                                    <input style={{ width: "20px", height: "20px"}} type="checkbox" name="check3" value={1} checked={check3 > 0 ? true : false} onChange={this.onChangecb} />
                                    Check 3
                                </label>
                            </section>
                        
                        </fieldset>
                        

                        {this.state.showsubmit ? 
                        <footer style={{padding: "20px"}}>
                          <button type="submit"  style={{fontSize: "18px", backgroundColor: "#0081ff", color: "white", padding: "3px", borderRadius: "3px", cursor: "pointer", border: "none"}}>{this.state.found ? "Update" : "Submit"}</button>
                          &nbsp;&nbsp;
                          <span type="reset" onClick={(e) => this.onCancel(e)}  style={{fontSize: "16px", backgroundColor: "#8b8b8b", color: "white", padding: "3px", borderRadius: "3px", cursor: "pointer"}}>Cancel</span>
                        </footer>
                        : ""}
                      </form>

      </div>
    );
  }
}
