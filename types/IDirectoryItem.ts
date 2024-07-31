export default interface IDirectoryItem {
    name: string;
    type: 'directory' | 'file';
    creationDate: Date;
    modificationDate: Date;
}