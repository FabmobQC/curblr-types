import {Feature, LineString, FeatureCollection} from '@turf/helpers'

interface Location {
  shstRefId:string;
  shstLocationStart:number;
  shstLocationEnd:number;
  sideOfStreet:"left"|"right";
  objectId?:string;
  derivedFrom?:string;
  marker?:string;
  baysAngle?: "parallel" | "perpendicular" | "diagonal";
  baysCount?:number;
  streetName?:string;
}

interface Authority {
  name?:string;
  url?:string;
  phone?:string;
}

interface Manifest {
  createdDate?:string; // should this be a full timestamp? ISO format
  lastUpdatedDate?:string; // should this be a full timestamp? ISO format
  curblrVersion?:string;
  priorityHierarchy:Array<string>;
  timeZone?:string;
  currency?:string;
  authority?:Authority;
}

interface Rule  {
  activity:"parking" | "no parking" | "stopping" | "no stopping" | "loading" | "no loading" | "no standing";
  priorityCategory?:string;
  maxStay?:number
  noReturn?:number
  payment?:boolean;
  authority?:Authority; // changed v1 draft spec to object to simplify inclusion in rule
}

interface DaysOfWeek {
  days:Array<"mo"|"tu"|"we"|"th"|"fr"|"sa"|"su">;
  occurrencesInMonth?:Array<"1st"|"2nd"|"3rd"|"4th"|"5th"|"last">
}

interface TimesOfDay {
  from:string;
  to:string;
}

interface DesignatedPeriods {
  name:string;
  apply:"only during"|"except during";
}

interface TimeSpan {
  effectiveDates?:[{to:string, from:string}];
  daysOfWeek?:DaysOfWeek;
  daysOfMonth?:Array<string|"even"|"odd"|"last">;
  timesOfDay?:Array<TimesOfDay>;
  designatedPeriods?:Array<DesignatedPeriods>
}

interface UserClass {
  classes?:string[];
  subclasses?:string[];
  maxHeight?:number;
  maxLength?:number;
  maxWeight?:number;
  minHeight?:number;
  minLength?:number;
  minWeight?:number;
}

interface Rate {
  fees?:number[];
  durations?:number[];
  timeSpans?:TimeSpan[];
}

interface Payment {
  rates?:Rate[];
  methods?:string[];
  forms?:string[];
  operator?:string;
  phone?:string;
  deviceID?:string;
}

interface Regulation {
  rule:Rule;
  timeSpans?:TimeSpan[];
  userClasses?:UserClass[];
  payment?:Payment;
}

interface CurbProperties {
  location:Location;
  regulations:Regulation[];
}

interface CurbFeature extends Feature<LineString, CurbProperties> {
  type:"Feature";
  geometry:LineString;
  properties:CurbProperties;
}

interface CurbFeatureCollection extends FeatureCollection<LineString, CurbProperties> {
  type:"FeatureCollection";
  manifest?:Manifest;
  features:CurbFeature[];
}
