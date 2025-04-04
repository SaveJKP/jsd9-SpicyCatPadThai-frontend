import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <div >
      <div className="container__div">
        <div>
          <h1>User Profile</h1>
          <p>User ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}
