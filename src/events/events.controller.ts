import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEventDto } from "./create-event-dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";
import { Repository } from "typeorm";

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) {

  }

  @Get()
  async findAll(): Promise<Event[]> {
    this.logger.log('Hit the findAll route');
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
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
    if (!event){
      throw new NotFoundException('Event not found');
    }
     return await this.repository.save({
      ...event,
      ...input,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id): Promise<void> {
    const index = await this.repository.findOne({ where: { id } });
    if (!index){
      throw new NotFoundException('Event not found');
    }
    await this.repository.remove(index);
    
  }
}