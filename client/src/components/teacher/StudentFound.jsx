export default function StudentFound(props){
    return (
        <>
            <div className="student-found">
                {props.firstname} {props.lastname}
            </div>
        </>
    );
}