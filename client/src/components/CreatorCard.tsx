import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListCreator = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: auto;
  border-radius: 20px;
  padding: 20px;
  a {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    img {
      border-radius: 50%;
      margin-right: 10px;
    }
    div {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      span {
        color: var(--neon-red);
        margin-top: 10px;
        font-size: 12px;
        i {
          margin-right: 3px;
        }
      }
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

interface CreatorCardProps {
  memberId: number;
  nickname: string;
  heart: number;
}

const CreatorCard = ({ memberId, nickname, heart }: CreatorCardProps) => (
  <ListCreator>
    <Link to={`/users/${memberId}/${nickname}`}>
      <img
        src={`https://picsum.photos/seed/${memberId}/50/50.webp`}
        alt={`avator of ${nickname}}`}
      />
      <div>
        {nickname}
        <span>
          <i className="fa-solid fa-heart" />
          {heart}
        </span>
      </div>
    </Link>
  </ListCreator>
);

export default CreatorCard;
