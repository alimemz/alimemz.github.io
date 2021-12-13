import { ReadOutlined } from '@ant-design/icons';
import { Divider, Popover, Tag } from 'antd';
import styled from 'styled-components';

export type Movie = {
  title: string;
  year: number;
  rank: number;
  director: string;
  stars: string;
  image_url: string;
  genres: string[];
  story: string | undefined;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card>
      <img src={movie.image_url} alt={movie.title} />
      <CardContent>
        <CardTitle>
          <span className='title'>{`#${movie.rank}  ${movie.title}   [${movie.year}]`}</span>
          <div className='tags'>
            {movie.genres.map((item) => (
              <Tag key={'genre ' + item}>{item}</Tag>
            ))}
          </div>
        </CardTitle>

        <Divider />

        <CardBody>
          <div>
            <p>Directed by:</p>
            <p>{movie.director}</p>
          </div>
          <div>
            <p>Stars:</p>
            <p>{movie.stars}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Popover
              content={<p style={{ maxWidth: '25vw', fontSize: '1vmax', color: 'white' }}>{movie.story}</p>}
              placement='left'
              color='#181717df'>
              <button>
                <ReadOutlined style={{ marginRight: 5 }} />
                Read Story
              </button>
            </Popover>
          </div>
        </CardBody>
      </CardContent>
    </Card>
  );
}

const Card = styled.div`
  background-color: white;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 5px black;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-width: 100%;
  margin: 20px;
  gap: 20px;
  height: fit-content;
  padding: 20px;
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 0 0 20px darkblue;
  }
  @media (max-width: 450px) {
    padding: 5px;
    flex-direction: row-reverse;
  }

  & img {
    width: 150px;
    align-self: center;
    flex-grow: 0;
    @media (max-width: 450px) {
      width: 100px;
    }
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & .ant-divider {
    margin: 10px 0;
  }
`;

const CardTitle = styled.div`
  font-size: 25px;
  font-weight: 900;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 450px) {
    font-size: 13px;
    flex-direction: column;
    align-items: flex-start;
  }
  & div.tags {
    display: flex;
    flex-wrap: wrap;
    & span.ant-tag {
      font-size: 18px;
      font-weight: 400;
      padding: 0.3em;
      @media (max-width: 450px) {
        font-size: 10px;
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  position: relative;
  padding-left: 210;
  justify-content: space-around;
  & div {
    flex-grow: 1;
  }
  & p {
    font-size: 20px;
    font-weight: 700;
    @media (max-width: 450px) {
      font-size: 11px;
    }
  }
  & p:first-child {
    font-size: 15px;
    font-weight: 400;
    @media (max-width: 450px) {
      font-size: 8px;
    }
  }

  & button {
    font-size: 20px;
    border-radius: 30px;
    color: black;
    padding: 5px 10px;
    @media (max-width: 450px) {
      font-size: 12px;
    }
  }
`;
