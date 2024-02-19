import { Chapter } from "./Chapter";
import { PirType } from "./PirType";
import { WordPair } from "./WordPair";

export class Pir {
  pirId: any;
  editorId: any;
  name: string | any;
  description: string;
  assigned: boolean | any;
  chapters: Chapter[];
  wordPairs: WordPair[];
  imageUrl: string;
  groupId: any; // which group edits the pir
  author: string;
  type: PirType;
  allowed: boolean;

  constructor(
    pirId: any,
    editorId: any,
    groupId: any,
    name: string | any,
    description: string,
    chapters: Chapter[],
    wordPairs: WordPair[],
    imageUrl: string,
    author: string,
    type: PirType,
    allowed: boolean
  ) {
    this.pirId = pirId;
    this.editorId = editorId;
    this.groupId = groupId;
    this.name = name;
    this.description = description;
    this.chapters = chapters;
    this.wordPairs = wordPairs;
    this.imageUrl = imageUrl;
    this.author = author;
    this.type = type;
    this.allowed = allowed;
  }
}
