export interface Note{
    _id : string,
    title : string,
    text?: string,
    createdAt: string,
    updatedAt: string
}

export interface newNote{
    title: string,
    text?: string
}

