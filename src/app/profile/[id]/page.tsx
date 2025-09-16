

export default function UserProfile({ params }: any) {
    return (
        <div>
            <h1>Profile</h1>;
            <h2>Welcome, {params.id}</h2>
        </div>
    );
}
