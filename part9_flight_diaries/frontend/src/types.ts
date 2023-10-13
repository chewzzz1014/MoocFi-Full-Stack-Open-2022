// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy'
}


// export type Visibility = 'great' | 'good' | 'ok' | 'poor'
export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor'
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string; // optional field
}


export type NonSensitiveEntries = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

// for frontend
export interface DiaryProps {
    diary: NonSensitiveEntries;
}

export interface FormProps {
    diaries: NonSensitiveEntries[];
    setDiaries: (value: React.SetStateAction<NonSensitiveEntries[]>) => void
}