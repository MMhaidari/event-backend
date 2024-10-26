import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event-dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";

@Controller('/events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const event = this.events.find((event) => event.id === parseInt(id));
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      id: this.events.length + 1,
      date: new Date(),
      ...input,
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateEventDto) {
    const event = this.events.find((event) => event.id === parseInt(id));
    if (!event) {
      throw new Error('Event not found');
    }
    Object.assign(event, input);
    return event;
    
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    const index = this.events.findIndex((event) => event.id === parseInt(id));
    if (index === -1) {
      throw new Error('Event not found');
    }
    this.events.splice(index, 1);
    return true

  }
}