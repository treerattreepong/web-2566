const RB = ReactBootstrap;


class App extends React.Component {
  title = (
    <RB.Alert variant="info">
      <b>Work6 :</b> Firebase
    </RB.Alert>
  );
  footer = (
    <div>
      By 653380093-9 treerat treepong <br />
      College of Computing, Khon Kaen University
    </div>
  );
  state = {
        scene: 0,
        students:[],
        stdid:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdphone:"",
  } 

  render() {
    var stext = JSON.stringify(this.state.students);
    return (
      <RB.Card>
        <RB.Card.Header>{this.title}</RB.Card.Header>
        <RB.Card.Body>
          <RB.Button onClick={() => this.readData()}>Read Data</RB.Button>
          <RB.Button onClick={()=>this.autoRead()}>Auto Read</RB.Button>

          <div>
           < StudentTable data ={this.state.students}/>
          </div>
          <b>เพิ่มนักศึกษา :</b><br/>
      <TextInput label="ID" app={this} value="stdid"/>  
      <TextInput label="ชื่อ" app={this} value="stdfname"/>
      <TextInput label="สกุล" app={this} value="stdlname"/>
      <TextInput label="Email" app={this} value="stdemail"/>        
      <TextInput label="Phone" app={this} value="stdphone"/>
      <RB.Button onClick={()=>this.insertData()}>เพิ่มข้อมูล</RB.Button>
        </RB.Card.Body>
        <RB.Card.Footer>{this.footer}</RB.Card.Footer>
      </RB.Card>
    );
  }

  readData() {
    db.collection("students").get().then((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      console.log(stdlist);
      this.setState({ students: stdlist });
    });
  }

  autoRead() {
    db.collection("students").onSnapshot((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ students: stdlist });
    });
  }
  insertData(){
    db.collection("students").doc(this.state.stdid).set({
       title : this.state.stdtitle,
       fname : this.state.stdfname,
       lname : this.state.stdlname,
       phone : this.state.stdphone,
       email : this.state.stdemail,
    });
  }
  edit(std){      
    this.setState({
     stdid    : std.id,
     stdtitle : std.title,
     stdfname : std.fname,
     stdlname : std.lname,
     stdemail : std.email,
     stdphone : std.phone,
    })
 }
 delete(std){
  if(confirm("ต้องการลบข้อมูล")){
     db.collection("students").doc(std.id).delete();
  }
}
}
const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function StudentTable({data, app}){
  return <table className='table'>
  <tr>
      <th>รหัส</th>
      <th>คำนำหน้า</th>
      <th>ชื่อ</th>
      <th>สกุล</th>
      <th>email</th>
      </tr>
      {
        data.map((s)=><tr>
        <td>{s.id}</td>
        <td>{s.title}</td>
        <td>{s.fname}</td>
        <td>{s.lname}</td>
        <td>{s.email}</td>
        <td><EditButton std={s} app={app}/></td>
        <td><DeleteButton std={s} app={app}/></td>        
        </tr> )
      }
  </table>
}


function TextInput({label,app,value}){
    return <label className="form-label">
    {label}:    
     <input className="form-control"
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function EditButton({std,app}){
    return <button class ="edit" onClick={()=>app.edit(std)}>แก้ไข</button>
  }

  function DeleteButton({std,app}){    
    return <button class ="delete" onClick={()=>app.delete(std)}>ลบ</button>
  }


  
const firebaseConfig = {
  apiKey: "AIzaSyD6SkQRaZPfvtrQ9lqEB07dze6h-dTTd5k",
  authDomain: "web2566-treerat.firebaseapp.com",
  projectId: "web2566-treerat",
  storageBucket: "web2566-treerat.appspot.com",
  messagingSenderId: "569779202472",
  appId: "1:569779202472:web:8d8e34bebc7b8a4ad5d59d",
  measurementId: "G-J4TEXB7ZZ3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.collection("students").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
});












