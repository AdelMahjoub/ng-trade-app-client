export class Game {
  _id: string;
  name: string;
  url: string;
  summary: string;
  coverUrl: string;
  owner: any;
  available: boolean;
  authIsOwner: boolean;
  requestedBy: string[];
  constructor(props) {
    this._id = props['_id'] || '';
    this.name = props['name'] || '';
    this.url = props['url'] || '';
    this.summary = props['summary'] || '';
    this.coverUrl = props['coverUrl'] || (props['cover'] ? ('https:' + props['cover']['url']) : 'http://via.placeholder.com/90x90');
    this.owner = props['owner'] || null;
    this.available = props['avalable'] || true;
    this.requestedBy = props['requestedBy'] || [];
    this.authIsOwner = props['authIsOwner'] || false;
  }
}
