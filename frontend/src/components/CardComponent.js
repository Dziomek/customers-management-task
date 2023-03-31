import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../styles/CardComponent.css'

function CardComponent({title, subtitle, buttonSubtitle, link}) {
  return (
    <Card className='basic-card'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {subtitle}
        </Card.Text>
        <Link to={link}>
            <Button variant="primary">{buttonSubtitle}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;