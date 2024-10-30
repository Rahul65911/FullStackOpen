import "../index.css"

export default function Notification({message, classN}) {
    if(message == null) {
        return null
    }

    return (
        <div className={classN}>
            {message}
        </div>
    )
}