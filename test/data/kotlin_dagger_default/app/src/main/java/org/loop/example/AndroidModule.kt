package org.loop.example

import android.app.Application
import android.content.Context
import android.location.LocationManager
import dagger.Module
import dagger.Provides
import javax.inject.Named
import javax.inject.Singleton

/**
 * A module for Android-specific dependencies which require a [android.content.Context] or [ ] to create.
 */
@Module
class AndroidModule(private val application: Application) {

    /**
     * Allow the application context to be injected but require that it be annotated with [ ][ForApplication] to explicitly differentiate it from an activity context.
     */
    @Provides
    @Singleton
    @ForApplication
    fun provideApplicationContext(context: Context, readable : Readable): Context = application

    @Provides
    @Singleton
    fun provideLocationManager(): LocationManager = application.getSystemService(Context.LOCATION_SERVICE) as LocationManager

    @Named("something")
    @Provides
    @Singleton
    fun provideSomething(): String = "something"

    @Provides
    @Singleton
    @Named("something Else")
    fun provideSomethingElse(): String = "somethingElse"

}
