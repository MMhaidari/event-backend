import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event-dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) {

  }

  @Get()
  async findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    const event = await this.repository.findOne({ where: { id } });
    if (!event){
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto): Promise<Event> {
    return await this.repository.save({
      date: new Date(),
      ...input,
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto): Promise<Event> {
    const event = await this.repository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }
     return await this.repository.save({
      ...event,
      ...input,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id): Promise<void> {
    const index = await this.repository.findOne({ where: { id } });
    if (!index) {
      throw new Error('Event not found');
    }
    await this.repository.remove(index);

  }
}