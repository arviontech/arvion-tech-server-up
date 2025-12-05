import { TImageFiles } from '../../interface/image.interface';
import catchAsync from '../../utils/catchAsync';
import {
    generatePaginationLinks,
    generateResourceLinks,
} from '../../utils/hateoas';
import sendResponse from '../../utils/sendResponse';
import { TeamService } from './team.service';
import httpStatus from 'http-status';

const createTeam = catchAsync(async (req, res) => {
    const result = await TeamService.createTeam(req.body, req.files as TImageFiles);
    const path = 'teams';
    const dataWithLinks = {
        ...result.toObject(),
        links: generateResourceLinks(result, path),
    };

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Team member created successfully',
        data: dataWithLinks,
    });
});

const getAllTeams = catchAsync(async (req, res) => {
    const result = await TeamService.getAllTeams(req.query);
    const path = 'teams';
    const metaWithLinks = {
        ...result.meta,
        links: generatePaginationLinks(result.meta, path),
    };

    const dataWithLinks = result.data.map((item: any) => ({
        ...item.toObject(),
        links: generateResourceLinks(item, path),
    }));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All team members retrieved successfully',
        meta: metaWithLinks,
        data: dataWithLinks,
    });
});

const getTeamById = catchAsync(async (req, res) => {
    const result = await TeamService.getTeamById(req.params.id);
    const path = 'teams';
    const dataWithLinks = {
        ...result.toObject(),
        links: generateResourceLinks(result, path),
    };

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Team member retrieved successfully',
        data: dataWithLinks,
    });
});

const updateTeam = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TeamService.updateTeam(
        req.body,
        id,
        req.files as TImageFiles,
    );

    const path = 'teams';
    const dataWithLinks = {
        ...result?.toObject(),
        links: generateResourceLinks(result, path),
    };

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Team member updated successfully',
        data: dataWithLinks,
    });
});

const deleteTeam = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TeamService.deleteTeam(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Team member deleted successfully',
        data: result,
    });
});

export const TeamController = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
};
