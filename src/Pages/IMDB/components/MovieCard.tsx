import { ReadOutlined } from '@ant-design/icons';
import { Button, Divider, Popover, Tag } from 'antd';
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

type Props = {
  movie: Movie;
};
export default function MovieCard({ movie }: Props) {
  return (
    <Card
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 0 20px darkblue')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 5px black')}>
      <img width={150} src={movie.image_url} style={{ alignSelf: 'center', flexGrow: 0 }} />
      <div>
        <CardTitle>
          <div>{`#${movie.rank}  ${movie.title}   [${movie.year}]`}</div>
          <div>
            {movie.genres.map((item) => (
              <Tag style={{ fontSize: '0.6em', fontWeight: 400, padding: '0.3em' }}>{item}</Tag>
            ))}
          </div>
        </CardTitle>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <CardBody>
          <div>
            <p>Directed by:</p>
            <p>{movie.director}</p>
          </div>
          <div>
            <p>Stars:</p>
            <p>{movie.stars}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popover
              content={<p style={{ maxWidth: 300, fontSize: '1.5em', color: 'white' }}>{movie.story}</p>}
              placement='left'
              color='#181717df'>
              <Button
                shape='round'
                size='large'
                icon={<ReadOutlined />}
                style={{ fontSize: '1.5em', padding: '0 20px' }}>
                Read Story
              </Button>
            </Popover>
          </div>
        </CardBody>
      </div>
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
  margin: 20px;
  gap: 20px;
  height: fit-content;
  padding: 20px;
  transition: box-shadow 0.5s;

  & > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
const CardTitle = styled.div`
  font-size: 2em;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
  }
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-left: 210;
  justify-content: space-around;
  & div {
    flex-grow: 1;
  }
  & p {
    font-size: 1.4em;
    font-weight: 700;
  }
  & p:first-child {
    font-size: 1.2em;
    font-weight: 400;
  }
`;
