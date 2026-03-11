import "./UserCard.css";

export function UserCard({ user, onEdit, onDelete }) {
  function handleEdit() {
    onEdit(user.id);
  }

  function handleDelete() {
    onDelete(user.id);
  }

  return (
    <div className="user-card">
      <div className="user-card__info">
        <p className="user-card__name">{user.name}</p>
        <p className="user-card__email">{user.email}</p>
      </div>
      <div className="user-card__actions">
        <button className="btn btn-secondary" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}