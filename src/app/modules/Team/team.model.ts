import { model, Schema } from 'mongoose';
import { ITeam } from './team.interface';

const teamSchema = new Schema<ITeam>(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Team = model<ITeam>('Team', teamSchema);
