export default function LoginTwo(props){
    return(
        <div className="container">
        <form onSubmit={props.setUser}></form>
        </div>
    )
}