import * as React from 'react';
import { Show } from '../../types/show';
import { Card, Tag, Popover, Badge } from 'antd';
import './show.css';
import { HeartOutlined } from '@ant-design/icons/lib';

interface ShowProps {
  show: Show;
}

const Show = (props: ShowProps): JSX.Element => {
  const { show } = props;

  return (
    <Badge count={show.rating.average}>
      <Card
        hoverable={true}
        cover={<img src={show.image.medium} alt={`${show.name} image`}/>}
        size="small"
        className="show-list-item"
        actions={[<HeartOutlined key="favorite"/>]}
      >
        <Card.Meta
          title={<span title={show.name}>{show.name}</span>}
          description={
            <Popover
              content={show.genres.map((genre => (
                <Tag key={genre}>{genre}</Tag>
              )))}
            >
              <Tag>{show.genres[0]} ...</Tag>
            </Popover>
          }
        />
      </Card>
    </Badge>
  );
};

export default React.memo(Show);
