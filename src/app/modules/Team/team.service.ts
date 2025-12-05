import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../Error/AppError';
import { TImageFiles } from '../../interface/image.interface';
import { ITeam } from './team.interface';
import { Team } from './team.model';
import httpStatus from 'http-status';

const createTeam = async (payload: ITeam, images: TImageFiles) => {
    const teamImages = images?.['team-images'] || [];

    if (teamImages.length > 0) {
        payload.image = teamImages[0].path;
    }

    const newTeam = await Team.create(payload);
    return newTeam;
};

const getAllTeams = async (query: Record<string, unknown>) => {
    const searchableFields = ['name', 'role'];

    const teamQueryBuilder = new QueryBuilder(Team.find(), query)
        .search(searchableFields)
        .filter();

    const meta = await teamQueryBuilder.countTotal();
    const data = await teamQueryBuilder.sort().pagination().fields().modelQuery;

    return {
        meta,
        data,
    };
};

const getTeamById = async (id: string) => {
    const team = await Team.findById(id);
    if (!team) {
        throw new AppError(httpStatus.NOT_FOUND, 'Team member not found');
    }
    return team;
};

const updateTeam = async (
    payload: Partial<ITeam>,
    id: string,
    images?: TImageFiles,
) => {
    const team = await Team.findById(id);
    if (!team) {
        throw new AppError(httpStatus.NOT_FOUND, 'Team member not found');
    }

    const teamImages = images?.['team-images'] || [];
    if (teamImages.length > 0) {
        payload.image = teamImages[0].path;
    }

    const updatedTeam = await Team.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedTeam;
};

const deleteTeam = async (id: string) => {
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
        throw new AppError(httpStatus.NOT_FOUND, 'Team member not found');
    }
    return team;
};

export const TeamService = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
};
